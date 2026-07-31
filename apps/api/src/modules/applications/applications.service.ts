import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { generateUniqueSlug } from '../../common/slugify';

@Injectable()
export class ApplicationsService {
  constructor(private db: DatabaseService) {}


  async findAll(skip = 0, take = 10, q?: string) {
    const where = {
      active: true,
      ...(q ? { name: { contains: q, mode: 'insensitive' as const } } : {}),
    };

    const [data, total] = await Promise.all([
      this.db.application.findMany({
        where,
        skip,
        take,
        include: {
          technologies: { include: { technology: true } },
        },
        orderBy: { order: 'asc' },
      }),
      this.db.application.count({ where }),
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
    const app = await this.db.application.findUnique({
      where: { id },
      include: {
        technologies: { include: { technology: true } },
        ingredients: { include: { ingredient: true } },
      },
    });

    if (!app || !app.active) {
      throw new NotFoundException(`Aplicação ${id} não encontrada`);
    }

    return app;
  }

  async findBySlug(slug: string) {
    const app = await this.db.application.findUnique({
      where: { slug },
      include: {
        technologies: { include: { technology: true } },
        ingredients: { include: { ingredient: true } },
      },
    });

    if (!app || !app.active) {
      throw new NotFoundException(`Aplicação ${slug} não encontrada`);
    }

    return app;
  }

  async create(data: CreateApplicationDto) {
    const slug = await generateUniqueSlug(data.name, async (slug) =>
      !!(await this.db.application.findFirst({ where: { slug } })));

    return this.db.application.create({
      data: { ...data, slug },
    });
  }

  async update(id: string, data: UpdateApplicationDto) {
    await this.findOne(id);

    const updateData: UpdateApplicationDto & { slug?: string } = { ...data };
    if (data.name) {
      updateData.slug = await generateUniqueSlug(data.name, async (slug) =>
        !!(await this.db.application.findFirst({ where: { slug, id: { not: id } } })));
    }

    return this.db.application.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.db.application.update({
      where: { id },
      data: { active: false },
    });
  }

  async setTechnologies(id: string, technologyIds: string[]) {
    await this.findOne(id);

    await this.db.technologyOnApplication.deleteMany({ where: { applicationId: id } });
    if (technologyIds.length) {
      await this.db.technologyOnApplication.createMany({
        data: technologyIds.map((technologyId) => ({ applicationId: id, technologyId })),
      });
    }

    return this.findOne(id);
  }

  async setIngredients(id: string, ingredientIds: string[]) {
    await this.findOne(id);

    await this.db.ingredientOnApplication.deleteMany({ where: { applicationId: id } });
    if (ingredientIds.length) {
      await this.db.ingredientOnApplication.createMany({
        data: ingredientIds.map((ingredientId) => ({ applicationId: id, ingredientId })),
      });
    }

    return this.findOne(id);
  }
}
