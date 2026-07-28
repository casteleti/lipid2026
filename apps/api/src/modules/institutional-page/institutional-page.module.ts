import { Module } from '@nestjs/common';
import { InstitutionalPageController } from './institutional-page.controller';
import { InstitutionalPageService } from './institutional-page.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [InstitutionalPageController],
  providers: [InstitutionalPageService],
})
export class InstitutionalPageModule {}
