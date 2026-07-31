import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';
import { generateUniqueSlug } from '../../common/slugify';

@Injectable()
export class TechnologiesService {
  constructor(private db: DatabaseService) {}


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

    // Sem filtro de `active` de propósito: é por id, e o painel precisa abrir (e
    // reativar) uma tecnologia desativada. A rota pública é por slug e essa, sim, filtra.
    if (!technology) {
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
    const slug = await generateUniqueSlug(data.name, async (slug) =>
      !!(await this.db.technology.findFirst({ where: { slug } })));

    return this.db.technology.create({
      data: { ...data, slug },
    });
  }

  /** Existência sem o filtro de `active`: o painel precisa poder editar (e reativar) uma
   * tecnologia desativada, e `findOne` trata inativa como inexistente. */
  private async ensureExists(id: string) {
    const found = await this.db.technology.findUnique({ where: { id }, select: { id: true } });
    if (!found) throw new NotFoundException(`Tecnologia ${id} não encontrada`);
  }

  async update(id: string, data: UpdateTechnologyDto) {
    await this.ensureExists(id);

    const updateData: UpdateTechnologyDto & { slug?: string } = { ...data };
    if (data.name) {
      updateData.slug = await generateUniqueSlug(data.name, async (slug) =>
        !!(await this.db.technology.findFirst({ where: { slug, id: { not: id } } })));
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
