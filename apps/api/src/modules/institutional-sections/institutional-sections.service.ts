import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UpdateInstitutionalSectionDto } from './dto/update-institutional-section.dto';
import { CreateInstitutionalSectionItemDto } from './dto/create-institutional-section-item.dto';
import { UpdateInstitutionalSectionItemDto } from './dto/update-institutional-section-item.dto';

@Injectable()
export class InstitutionalSectionsService {
  constructor(private db: DatabaseService) {}

  /// Devolve tudo (seções ativas e inativas, itens ativos e inativos) — a página pública
  /// filtra `active` no front, o admin precisa ver tudo pra poder reativar.
  async findAll() {
    return this.db.institutionalSection.findMany({
      orderBy: { order: 'asc' },
      include: { items: { orderBy: { order: 'asc' } } },
    });
  }

  async findOne(id: string) {
    const section = await this.db.institutionalSection.findUnique({
      where: { id },
      include: { items: { orderBy: { order: 'asc' } } },
    });

    if (!section) {
      throw new NotFoundException(`Seção ${id} não encontrada`);
    }

    return section;
  }

  async update(id: string, data: UpdateInstitutionalSectionDto) {
    await this.findOne(id);

    return this.db.institutionalSection.update({
      where: { id },
      data: data as any,
      include: { items: { orderBy: { order: 'asc' } } },
    });
  }

  async createItem(sectionId: string, data: CreateInstitutionalSectionItemDto) {
    await this.findOne(sectionId);

    return this.db.institutionalSectionItem.create({
      data: { ...(data as any), sectionId },
    });
  }

  async updateItem(itemId: string, data: UpdateInstitutionalSectionItemDto) {
    const item = await this.db.institutionalSectionItem.findUnique({ where: { id: itemId } });
    if (!item) {
      throw new NotFoundException(`Item ${itemId} não encontrado`);
    }

    return this.db.institutionalSectionItem.update({
      where: { id: itemId },
      data: data as any,
    });
  }

  async removeItem(itemId: string) {
    const item = await this.db.institutionalSectionItem.findUnique({ where: { id: itemId } });
    if (!item) {
      throw new NotFoundException(`Item ${itemId} não encontrado`);
    }

    return this.db.institutionalSectionItem.delete({ where: { id: itemId } });
  }
}
