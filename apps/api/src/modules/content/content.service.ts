import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { generateUniqueSlug } from '../../common/slugify';

const INCLUDE_PADRAO = {
  categories: { include: { category: true } },
  summaryPoints: { orderBy: { order: 'asc' } },
  faqs: { orderBy: { order: 'asc' } },
  files: { orderBy: { order: 'asc' } },
} satisfies Prisma.ContentInclude;

@Injectable()
export class ContentService {
  constructor(private db: DatabaseService) {}

  async findAll(
    skip = 0,
    take = 10,
    status?: string,
    q?: string,
    categorySlug?: string,
    type?: string,
  ) {
    const where = {
      ...(status ? { status: status as never } : { NOT: { status: 'ARCHIVED' as never } }),
      ...(q ? { title: { contains: q, mode: 'insensitive' as const } } : {}),
      ...(categorySlug ? { categories: { some: { category: { slug: categorySlug } } } } : {}),
      ...(type ? { type: type as never } : {}),
    };

    const [data, total] = await Promise.all([
      this.db.content.findMany({
        where,
        skip,
        take,
        include: INCLUDE_PADRAO,
        // publishedAt primeiro para a listagem pública respeitar a data editorial;
        // createdAt entra como desempate para rascunho, que ainda não tem publicação.
        orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
      }),
      this.db.content.count({ where }),
    ]);

    return {
      data,
      total,
      page: Math.floor(skip / take) + 1,
      pageSize: take,
      totalPages: Math.ceil(total / take),
    };
  }

  async findOne(id: string) {
    const content = await this.db.content.findUnique({
      where: { id },
      include: INCLUDE_PADRAO,
    });

    if (!content) {
      throw new NotFoundException(`Conteúdo ${id} não encontrado`);
    }

    return content;
  }

  async findBySlug(slug: string) {
    const content = await this.db.content.findUnique({
      where: { slug },
      include: INCLUDE_PADRAO,
    });

    if (!content || content.status !== 'PUBLISHED') {
      throw new NotFoundException(`Conteúdo ${slug} não encontrado`);
    }

    return content;
  }

  /** Conteúdos relacionados para o rodapé da leitura: mesma categoria primeiro. */
  async findRelacionados(slug: string, limite = 3) {
    const base = await this.db.content.findUnique({
      where: { slug },
      include: { categories: true },
    });

    if (!base) throw new NotFoundException(`Conteúdo ${slug} não encontrado`);

    const categoryIds = base.categories.map((c) => c.categoryId);

    const mesmaCategoria = categoryIds.length
      ? await this.db.content.findMany({
          where: {
            status: 'PUBLISHED',
            id: { not: base.id },
            categories: { some: { categoryId: { in: categoryIds } } },
          },
          include: INCLUDE_PADRAO,
          orderBy: [{ publishedAt: 'desc' }],
          take: limite,
        })
      : [];

    if (mesmaCategoria.length >= limite) return mesmaCategoria;

    // Completa com os mais recentes para o bloco nunca sair pela metade.
    const jaEscolhidos = [base.id, ...mesmaCategoria.map((c) => c.id)];
    const complemento = await this.db.content.findMany({
      where: { status: 'PUBLISHED', id: { notIn: jaEscolhidos } },
      include: INCLUDE_PADRAO,
      orderBy: [{ publishedAt: 'desc' }],
      take: limite - mesmaCategoria.length,
    });

    return [...mesmaCategoria, ...complemento];
  }

  /**
   * Entrega as URLs dos arquivos mediante um lead já registrado para ESTE conteúdo.
   *
   * Existe porque mandar as URLs junto com a página deixaria o material acessível a quem
   * abrisse o código-fonte — o formulário viraria enfeite e a conversão não seria
   * contada. Aqui o link só existe depois que o lead entrou no banco.
   *
   * Não é proteção do arquivo em si: /uploads é estático e quem tiver a URL acessa
   * direto. O que isto garante é que a URL não circula antes do preenchimento.
   */
  async arquivosLiberados(slug: string, leadId: string) {
    const conteudo = await this.db.content.findUnique({
      where: { slug },
      include: { files: { orderBy: { order: 'asc' } } },
    });

    if (!conteudo || conteudo.status !== 'PUBLISHED') {
      throw new NotFoundException(`Conteúdo ${slug} não encontrado`);
    }

    const lead = await this.db.lead.findFirst({
      where: { id: leadId, contentId: conteudo.id },
      select: { id: true },
    });

    if (!lead) {
      throw new ForbiddenException('Preencha o formulário para liberar o material.');
    }

    return conteudo.files;
  }

  /** Telemetria pública — não lança em slug inexistente. */
  async registrarVisita(slug: string) {
    const { count } = await this.db.content.updateMany({
      where: { slug, status: 'PUBLISHED' },
      data: { views: { increment: 1 } },
    });
    return { ok: count > 0 };
  }

  async create(data: CreateContentDto) {
    const { categoryIds, summaryPoints, faqs, files, ...rest } = data;

    const slug = await generateUniqueSlug(data.title, async (candidato) =>
      !!(await this.db.content.findFirst({ where: { slug: candidato } })),
    );

    return this.db.content.create({
      data: {
        ...rest,
        slug,
        publishedAt: rest.status === 'PUBLISHED' ? new Date() : null,
        categories: categoryIds?.length
          ? { create: categoryIds.map((categoryId) => ({ categoryId })) }
          : undefined,
        summaryPoints: summaryPoints?.length
          ? { create: summaryPoints.map((p, order) => ({ ...p, order })) }
          : undefined,
        faqs: faqs?.length ? { create: faqs.map((f, order) => ({ ...f, order })) } : undefined,
        files: files?.length ? { create: files.map((f, order) => ({ ...f, order })) } : undefined,
      },
      include: INCLUDE_PADRAO,
    });
  }

  async update(id: string, data: UpdateContentDto) {
    const existing = await this.findOne(id);
    const { categoryIds, summaryPoints, faqs, files, ...rest } = data;

    const updateData: Prisma.ContentUpdateInput = { ...rest };

    if (data.title) {
      updateData.slug = await generateUniqueSlug(data.title, async (candidato) =>
        !!(await this.db.content.findFirst({ where: { slug: candidato, id: { not: id } } })),
      );
    }

    if (data.status === 'PUBLISHED' && existing.status !== 'PUBLISHED') {
      updateData.publishedAt = new Date();
    }

    if (categoryIds) {
      await this.db.contentOnCategory.deleteMany({ where: { contentId: id } });
      updateData.categories = { create: categoryIds.map((categoryId) => ({ categoryId })) };
    }

    // Blocos filhos chegam como conjunto completo: apagar e recriar é o que faz o item
    // removido no formulário sumir de fato do banco.
    if (summaryPoints) {
      updateData.summaryPoints = {
        deleteMany: {},
        create: summaryPoints.map((p, order) => ({ ...p, order })),
      };
    }

    if (faqs) {
      updateData.faqs = { deleteMany: {}, create: faqs.map((f, order) => ({ ...f, order })) };
    }

    if (files) {
      updateData.files = { deleteMany: {}, create: files.map((f, order) => ({ ...f, order })) };
    }

    return this.db.content.update({
      where: { id },
      data: updateData,
      include: INCLUDE_PADRAO,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.db.content.update({
      where: { id },
      data: { status: 'ARCHIVED' },
    });
  }
}
