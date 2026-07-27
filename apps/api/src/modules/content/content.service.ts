import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentService {
  constructor(private db: DatabaseService) {}

  private async generateSlug(title: string, excludeId?: string): Promise<string> {
    const base = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    let slug = base;
    let counter = 1;

    while (
      await this.db.content.findFirst({
        where: { slug, ...(excludeId ? { id: { not: excludeId } } : {}) },
      })
    ) {
      slug = `${base}-${counter}`;
      counter++;
    }

    return slug;
  }

  async findAll(skip = 0, take = 10, status?: string) {
    const where = status ? { status: status as never } : { NOT: { status: 'ARCHIVED' as never } };

    const [data, total] = await Promise.all([
      this.db.content.findMany({
        where,
        skip,
        take,
        include: { categories: { include: { category: true } } },
        orderBy: { createdAt: 'desc' },
      }),
      this.db.content.count({ where }),
    ]);

    return { data, total, page: Math.floor(skip / take) + 1, pageSize: take, totalPages: Math.ceil(total / take) };
  }

  async findOne(id: string) {
    const content = await this.db.content.findUnique({
      where: { id },
      include: { categories: { include: { category: true } } },
    });

    if (!content) {
      throw new NotFoundException(`Conteúdo ${id} não encontrado`);
    }

    return content;
  }

  async findBySlug(slug: string) {
    const content = await this.db.content.findUnique({
      where: { slug },
      include: { categories: { include: { category: true } } },
    });

    if (!content || content.status !== 'PUBLISHED') {
      throw new NotFoundException(`Conteúdo ${slug} não encontrado`);
    }

    return content;
  }

  async create(data: CreateContentDto) {
    const { categoryIds, ...rest } = data;
    const slug = await this.generateSlug(data.title);

    return this.db.content.create({
      data: {
        ...rest,
        slug,
        publishedAt: rest.status === 'PUBLISHED' ? new Date() : null,
        categories: categoryIds?.length
          ? { create: categoryIds.map((categoryId) => ({ categoryId })) }
          : undefined,
      },
      include: { categories: { include: { category: true } } },
    });
  }

  async update(id: string, data: UpdateContentDto) {
    const existing = await this.findOne(id);
    const { categoryIds, ...rest } = data;

    const updateData: Record<string, unknown> = { ...rest };
    if (data.title) {
      updateData.slug = await this.generateSlug(data.title, id);
    }
    if (data.status === 'PUBLISHED' && existing.status !== 'PUBLISHED') {
      updateData.publishedAt = new Date();
    }

    if (categoryIds) {
      await this.db.contentOnCategory.deleteMany({ where: { contentId: id } });
      updateData.categories = { create: categoryIds.map((categoryId) => ({ categoryId })) };
    }

    return this.db.content.update({
      where: { id },
      data: updateData,
      include: { categories: { include: { category: true } } },
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
