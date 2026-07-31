import { Module } from '@nestjs/common';
import { SegmentPagesController } from './segment-pages.controller';
import { SegmentPagesService } from './segment-pages.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SegmentPagesController],
  providers: [SegmentPagesService],
})
export class SegmentPagesModule {}
