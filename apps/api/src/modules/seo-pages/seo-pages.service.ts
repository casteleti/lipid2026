import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UpsertSeoPageDto } from './dto/upsert-seo-page.dto';

@Injectable()
export class SeoPagesService {
  constructor(private db: DatabaseService) {}

  async findByRoute(route: string) {
    return this.db.seoPage.findUnique({ where: { route } });
  }

  async upsertByRoute(route: string, data: UpsertSeoPageDto) {
    return this.db.seoPage.upsert({
      where: { route },
      create: { route, ...data },
      update: data,
    });
  }
}
