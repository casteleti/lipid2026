import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';

@Injectable()
export class TechnologiesService {
  constructor(private db: DatabaseService) {}

  private async generateSlug(name: string, excludeId?: string): Promise<string> {
    const base = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    let slug = base;
    let counter = 1;

    while (
      await this.db.technology.findFirst({
        where: { slug, ...(excludeId ? { id: { not: excludeId } } : {}) },
      })
    ) {
      slug = `${base}-${counter}`;
      counter++;
    }

    return slug;
  }

  async findAll(skip = 0, take = 10, q?: string) {
    const where = {
      active: true,
      ...(q ? { name: { contains: q, mode: 'insensitive' as const } } : {}),
    };

    const [data, total] = await Promise.all([
      this.db.technology.findMany({
        where,
        skip,
        take,
        orderBy: { order: 'asc' },
      }),
      this.db.technology.count({ where }),
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

  async findBySlug(slug: string) {
    const technology = await this.db.technology.findUnique({
      where: { slug },
      include: {
        applications: { include: { application: true } },
        ingredients: { include: { ingredient: true } },
      },
    });

    if (!technology || !technology.active) {
      throw new NotFoundException(`Tecnologia ${slug} não encontrada`);
    }

    return technology;
  }

  async create(data: CreateTechnologyDto) {
    const slug = await this.generateSlug(data.name);

    return this.db.technology.create({
      data: { ...data, slug },
    });
  }

  async update(id: string, data: UpdateTechnologyDto) {
    await this.findOne(id);

    const updateData: UpdateTechnologyDto & { slug?: string } = { ...data };
    if (data.name) {
      updateData.slug = await this.generateSlug(data.name, id);
    }

    return this.db.technology.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.db.technology.update({
      where: { id },
      data: { active: false },
    });
  }
}
