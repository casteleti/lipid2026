import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { generateUniqueSlug } from '../../common/slugify';

/** Tudo que a listagem e o detalhe precisam mostrar de um ingrediente. */
const INCLUDE_PADRAO = {
  partner: true,
  category: true,
  codes: { orderBy: { order: 'asc' } },
  images: { orderBy: { order: 'asc' } },
  files: { orderBy: { order: 'asc' } },
  tags: { include: { tag: true } },
} satisfies Prisma.IngredientInclude;

export interface FiltrosIngrediente {
  q?: string;
  categorySlug?: string;
  tagSlug?: string;
  partnerSlug?: string;
}

@Injectable()
export class IngredientsService {
  constructor(private db: DatabaseService) {}

  async findAll(skip = 0, take = 10, filtros: FiltrosIngrediente = {}) {
    const { q, categorySlug, tagSlug, partnerSlug } = filtros;

    const where: Prisma.IngredientWhereInput = {
      active: true,
      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: 'insensitive' } },
              { inci: { contains: q, mode: 'insensitive' } },
              { excerpt: { contains: q, mode: 'insensitive' } },
              { codes: { some: { code: { contains: q, mode: 'insensitive' } } } },
            ],
          }
        : {}),
      ...(categorySlug ? { category: { slug: categorySlug } } : {}),
      ...(partnerSlug ? { partner: { slug: partnerSlug } } : {}),
      ...(tagSlug ? { tags: { some: { tag: { slug: tagSlug } } } } : {}),
    };

    const [data, total] = await Promise.all([
      this.db.ingredient.findMany({
        where,
        skip,
        take,
        orderBy: { name: 'asc' },
        include: INCLUDE_PADRAO,
      }),
      this.db.ingredient.count({ where }),
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
    const ingredient = await this.db.ingredient.findUnique({
      where: { id },
      include: {
        ...INCLUDE_PADRAO,
        technologies: { include: { technology: true } },
        applications: { include: { application: true } },
      },
    });

    if (!ingredient || !ingredient.active) {
      throw new NotFoundException(`Ingrediente ${id} não encontrado`);
    }

    return ingredient;
  }

  async findBySlug(slug: string) {
    const ingredient = await this.db.ingredient.findUnique({
      where: { slug },
      include: {
        ...INCLUDE_PADRAO,
        technologies: { include: { technology: true } },
        applications: { include: { application: true } },
      },
    });

    if (!ingredient || !ingredient.active) {
      throw new NotFoundException(`Ingrediente ${slug} não encontrado`);
    }

    return ingredient;
  }

  /**
   * Produtos para o bloco "Conheça também".
   *
   * Ranqueado, não aleatório: mesma categoria pesa mais que tag em comum, que pesa mais
   * que mesmo fabricante. Se ainda faltar item (categoria com um produto só), completa com
   * outros do mesmo fabricante para o bloco nunca aparecer pela metade.
   */
  async findSimilares(slug: string, limite = 4) {
    const base = await this.db.ingredient.findUnique({
      where: { slug },
      include: { tags: true },
    });

    if (!base || !base.active) {
      throw new NotFoundException(`Ingrediente ${slug} não encontrado`);
    }

    const tagIds = base.tags.map((t) => t.tagId);

    const candidatos = await this.db.ingredient.findMany({
      where: {
        active: true,
        id: { not: base.id },
        OR: [
          ...(base.categoryId ? [{ categoryId: base.categoryId }] : []),
          ...(tagIds.length ? [{ tags: { some: { tagId: { in: tagIds } } } }] : []),
          ...(base.partnerId ? [{ partnerId: base.partnerId }] : []),
        ],
      },
      include: { ...INCLUDE_PADRAO, tags: { include: { tag: true } } },
      take: 40,
    });

    const pontuar = (item: (typeof candidatos)[number]) => {
      const tagsEmComum = item.tags.filter((t) => tagIds.includes(t.tagId)).length;
      return (
        (item.categoryId && item.categoryId === base.categoryId ? 100 : 0) +
        tagsEmComum * 10 +
        (item.partnerId && item.partnerId === base.partnerId ? 1 : 0)
      );
    };

    return candidatos
      .map((item) => ({ item, score: pontuar(item) }))
      .sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name, 'pt-BR'))
      .slice(0, limite)
      .map(({ item }) => item);
  }

  /**
   * Incrementa o contador de visitas da ficha pública.
   *
   * `updateMany` em vez de `update` porque um slug inexistente (link velho, bot varrendo)
   * não deve virar exceção: telemetria não pode derrubar requisição de página.
   */
  async registrarVisita(slug: string) {
    const { count } = await this.db.ingredient.updateMany({
      where: { slug, active: true },
      data: { views: { increment: 1 } },
    });
    return { ok: count > 0 };
  }

  async create(data: CreateIngredientDto) {
    const { codes, tagIds, images, files, ...campos } = data;

    const slug = await generateUniqueSlug(campos.name, async (candidato) =>
      !!(await this.db.ingredient.findFirst({ where: { slug: candidato } })),
    );

    return this.db.ingredient.create({
      data: {
        ...campos,
        slug,
        ...(codes?.length
          ? { codes: { create: codes.map((code, order) => ({ code, order })) } }
          : {}),
        ...(tagIds?.length ? { tags: { create: tagIds.map((tagId) => ({ tagId })) } } : {}),
        ...(images?.length
          ? { images: { create: images.map((img, order) => ({ ...img, order })) } }
          : {}),
        ...(files?.length
          ? { files: { create: files.map((f, order) => ({ ...f, order })) } }
          : {}),
      },
      include: INCLUDE_PADRAO,
    });
  }

  async update(id: string, data: UpdateIngredientDto) {
    await this.findOne(id);
    const { codes, tagIds, images, files, ...campos } = data;

    const updateData: Prisma.IngredientUpdateInput = { ...campos };

    if (campos.name) {
      updateData.slug = await generateUniqueSlug(campos.name, async (candidato) =>
        !!(await this.db.ingredient.findFirst({ where: { slug: candidato, id: { not: id } } })),
      );
    }

    // Códigos e tags são enviados como conjunto completo: apaga e recria em transação,
    // senão o que o usuário removeu no formulário continuaria no banco.
    if (codes) {
      updateData.codes = {
        deleteMany: {},
        create: codes.map((code, order) => ({ code, order })),
      };
    }

    if (tagIds) {
      updateData.tags = {
        deleteMany: {},
        create: tagIds.map((tagId) => ({ tagId })),
      };
    }

    if (images) {
      updateData.images = {
        deleteMany: {},
        create: images.map((img, order) => ({ ...img, order })),
      };
    }

    if (files) {
      updateData.files = {
        deleteMany: {},
        create: files.map((f, order) => ({ ...f, order })),
      };
    }

    return this.db.ingredient.update({
      where: { id },
      data: updateData,
      include: INCLUDE_PADRAO,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.db.ingredient.update({
      where: { id },
      data: { active: false },
    });
  }
}
