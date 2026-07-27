import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TechnologiesService {
  constructor(private db: DatabaseService) {}

  async findAll(skip = 0, take = 10) {
    const [data, total] = await Promise.all([
      this.db.technology.findMany({
        where: { active: true },
        skip,
        take,
        orderBy: { order: 'asc' },
      }),
      this.db.technology.count({ where: { active: true } }),
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
    const technology = await this.db.technology.findUnique({
      where: { id },
      include: {
        applications: { include: { application: true } },
        ingredients: { include: { ingredient: true } },
      },
    });

    if (!technology || !technology.active) {
      throw new NotFoundException(`Tecnologia ${id} não encontrada`);
    }

    return technology;
  }
}
