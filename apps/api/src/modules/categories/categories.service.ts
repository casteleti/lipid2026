import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { generateUniqueSlug } from '../../common/slugify';

@Injectable()
export class CategoriesService {
  constructor(private db: DatabaseService) {}


  async findAll(skip = 0, take = 50) {
    const [data, total] = await Promise.all([
      this.db.category.findMany({
        where: { active: true },
        skip,
        take,
        orderBy: { order: 'asc' },
      }),
      this.db.category.count({ where: { active: true } }),
    ]);

    return { data, total, page: Math.floor(skip / take) + 1, pageSize: take, totalPages: Math.ceil(total / take) };
  }

  async findOne(id: string) {
    const category = await this.db.category.findUnique({ where: { id } });

    if (!category || !category.active) {
      throw new NotFoundException(`Categoria ${id} não encontrada`);
    }

    return category;
  }

  async create(data: CreateCategoryDto) {
    const slug = await generateUniqueSlug(data.name, async (slug) =>
      !!(await this.db.category.findFirst({ where: { slug } })));

    return this.db.category.create({
      data: { ...data, slug },
    });
  }

  async update(id: string, data: UpdateCategoryDto) {
    await this.findOne(id);

    const updateData: UpdateCategoryDto & { slug?: string } = { ...data };
    if (data.name) {
      updateData.slug = await generateUniqueSlug(data.name, async (slug) =>
        !!(await this.db.category.findFirst({ where: { slug, id: { not: id } } })));
    }

    return this.db.category.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.db.category.update({
      where: { id },
      data: { active: false },
    });
  }
}
