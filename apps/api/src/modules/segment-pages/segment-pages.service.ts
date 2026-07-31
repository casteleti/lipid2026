import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UpdateSegmentPageDto } from './dto/update-segment-page.dto';

@Injectable()
export class SegmentPagesService {
  constructor(private db: DatabaseService) {}

  async findAll() {
    return this.db.segmentPage.findMany({ orderBy: { order: 'asc' } });
  }

  async findOne(idOrSlug: string) {
    const page = await this.db.segmentPage.findFirst({
      where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
    });

    if (!page) {
      throw new NotFoundException(`Página de segmento ${idOrSlug} não encontrada`);
    }

    return page;
  }

  async update(id: string, data: UpdateSegmentPageDto) {
    await this.findOne(id);

    return this.db.segmentPage.update({
      where: { id },
      data: data as any,
    });
  }
}
