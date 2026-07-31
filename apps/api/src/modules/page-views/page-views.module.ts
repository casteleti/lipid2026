import { Module } from '@nestjs/common';
import { PageViewsController } from './page-views.controller';
import { PageViewsService } from './page-views.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PageViewsController],
  providers: [PageViewsService],
})
export class PageViewsModule {}
