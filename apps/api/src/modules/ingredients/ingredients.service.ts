import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Injectable()
export class IngredientsService {
  constructor(private db: DatabaseService) {}

  private async generateSlug(name: string): Promise<string> {
    const base = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    let slug = base;
    let counter = 1;

    while (await this.db.ingredient.findUnique({ where: { slug } })) {
      slug = `${base}-${counter}`;
      counter++;
    }

    return slug;
  }

  async findAll(skip = 0, take = 10) {
    const [data, total] = await Promise.all([
      this.db.ingredient.findMany({
        where: { active: true },
        skip,
        take,
        orderBy: { name: 'asc' },
      }),
      this.db.ingredient.count({ where: { active: true } }),
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
        technologies: { include: { technology: true } },
        applications: { include: { application: true } },
      },
    });

    if (!ingredient || !ingredient.active) {
      throw new NotFoundException(`Ingrediente ${id} não encontrado`);
    }

    return ingredient;
  }

  async create(data: CreateIngredientDto) {
    const slug = await this.generateSlug(data.name);

    return this.db.ingredient.create({
      data: { ...data, slug },
    });
  }

  async update(id: string, data: UpdateIngredientDto) {
    await this.findOne(id);

    const updateData: UpdateIngredientDto & { slug?: string } = { ...data };
    if (data.name) {
      updateData.slug = await this.generateSlug(data.name);
    }

    return this.db.ingredient.update({
      where: { id },
      data: updateData,
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
