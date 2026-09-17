import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { generateUniqueSlug } from '../../common/slugify';
import type { Prisma } from '@prisma/client';

/**
 * `videos` chega validado como PartnerVideoDto[] (instâncias de classe, pelo
 * class-transformer), mas a coluna é Json e o Prisma só aceita valores JSON puros.
 * Serializar e reler produz o objeto simples que ele espera — e descarta qualquer
 * chave `undefined`, que o JSON não representa.
 */
function comVideosJson<T extends { videos?: unknown }>(data: T): Omit<T, 'videos'> & { videos?: Prisma.InputJsonValue } {
  const { videos, ...resto } = data;
  return videos === undefined
    ? resto
    : { ...resto, videos: JSON.parse(JSON.stringify(videos)) as Prisma.InputJsonValue };
}

@Injectable()
export class PartnersService {
  constructor(private db: DatabaseService) {}


  async findAll(skip = 0, take = 10, q?: string) {
    const where = {
      active: true,
      ...(q ? { name: { contains: q, mode: 'insensitive' as const } } : {}),
    };

    const [data, total] = await Promise.all([
      this.db.partner.findMany({
        where,
        skip,
        take,
        orderBy: { order: 'asc' },
      }),
      this.db.partner.count({ where }),
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
    const partner = await this.db.partner.findUnique({ where: { id } });

    if (!partner || !partner.active) {
      throw new NotFoundException(`Parceiro ${id} não encontrado`);
    }

    return partner;
  }

  async findBySlug(slug: string) {
    const partner = await this.db.partner.findUnique({ where: { slug } });

    if (!partner || !partner.active) {
      throw new NotFoundException(`Parceiro ${slug} não encontrado`);
    }

    return partner;
  }

  async create(data: CreatePartnerDto) {
    const slug = await generateUniqueSlug(data.name, async (slug) =>
      !!(await this.db.partner.findFirst({ where: { slug } })));

    return this.db.partner.create({
      data: { ...comVideosJson(data), slug },
    });
  }

  async update(id: string, data: UpdatePartnerDto) {
    await this.findOne(id);

    const updateData: ReturnType<typeof comVideosJson<UpdatePartnerDto>> & { slug?: string } =
      comVideosJson(data);
    if (data.name) {
      updateData.slug = await generateUniqueSlug(data.name, async (slug) =>
        !!(await this.db.partner.findFirst({ where: { slug, id: { not: id } } })));
    }

    return this.db.partner.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.db.partner.update({
      where: { id },
      data: { active: false },
    });
  }
}
