import { Injectable } from '@nestjs/common';
import { InstitutionalBlockSection } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { UpsertInstitutionalPageDto } from './dto/upsert-institutional-page.dto';

const SINGLETON_ID = 'singleton';

const SECTIONS: InstitutionalBlockSection[] = [
  'FACT',
  'PROCESS_STEP',
  'QUALITY_ITEM',
  'METRIC',
  'PRINCIPLE',
  'FAQ',
];

@Injectable()
export class InstitutionalPageService {
  constructor(private db: DatabaseService) {}

  async getFull() {
    const [page, blocks] = await Promise.all([
      this.db.institutionalPage.findUnique({ where: { id: SINGLETON_ID } }),
      this.db.institutionalBlock.findMany({
        where: { active: true },
        orderBy: { order: 'asc' },
      }),
    ]);

    const grouped = SECTIONS.reduce(
      (acc, section) => {
        acc[section] = blocks.filter((block) => block.section === section);
        return acc;
      },
      {} as Record<InstitutionalBlockSection, typeof blocks>,
    );

    return {
      ...(page ?? { id: SINGLETON_ID }),
      blocks: grouped,
    };
  }

  async upsert(data: UpsertInstitutionalPageDto) {
    return this.db.institutionalPage.upsert({
      where: { id: SINGLETON_ID },
      create: { id: SINGLETON_ID, ...data },
      update: data,
    });
  }
}
