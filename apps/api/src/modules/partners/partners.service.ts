import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';

@Injectable()
export class PartnersService {
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
      await this.db.partner.findFirst({
        where: { slug, ...(excludeId ? { id: { not: excludeId } } : {}) },
      })
    ) {
      slug = `${base}-${counter}`;
      counter++;
    }

    return slug;
  }

  async findAll(skip = 0, take = 10) {
    const [data, total] = await Promise.all([
      this.db.partner.findMany({
        where: { active: true },
        skip,
        take,
        orderBy: { order: 'asc' },
      }),
      this.db.partner.count({ where: { active: true } }),
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

  async create(data: CreatePartnerDto) {
    const slug = await this.generateSlug(data.name);

    return this.db.partner.create({
      data: { ...data, slug },
    });
  }

  async update(id: string, data: UpdatePartnerDto) {
    await this.findOne(id);

    const updateData: UpdatePartnerDto & { slug?: string } = { ...data };
    if (data.name) {
      updateData.slug = await this.generateSlug(data.name, id);
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
