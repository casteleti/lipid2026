import { Injectable, NotFoundException } from '@nestjs/common';
import { InstitutionalBlockSection } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { CreateInstitutionalBlockDto } from './dto/create-institutional-block.dto';
import { UpdateInstitutionalBlockDto } from './dto/update-institutional-block.dto';

@Injectable()
export class InstitutionalBlocksService {
  constructor(private db: DatabaseService) {}

  async findAll(section?: InstitutionalBlockSection) {
    return this.db.institutionalBlock.findMany({
      where: { active: true, ...(section ? { section } : {}) },
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string) {
    const block = await this.db.institutionalBlock.findUnique({ where: { id } });

    if (!block) {
      throw new NotFoundException(`Bloco ${id} não encontrado`);
    }

    return block;
  }

  async create(data: CreateInstitutionalBlockDto) {
    return this.db.institutionalBlock.create({ data });
  }

  async update(id: string, data: UpdateInstitutionalBlockDto) {
    await this.findOne(id);

    return this.db.institutionalBlock.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.db.institutionalBlock.delete({ where: { id } });
  }
}
