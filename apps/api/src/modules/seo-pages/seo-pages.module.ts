import { Module } from '@nestjs/common';
import { SeoPagesController } from './seo-pages.controller';
import { SeoPagesService } from './seo-pages.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SeoPagesController],
  providers: [SeoPagesService],
})
export class SeoPagesModule {}
