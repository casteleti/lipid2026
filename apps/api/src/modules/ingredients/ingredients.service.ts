import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class IngredientsService {
  constructor(private db: DatabaseService) {}

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
}
