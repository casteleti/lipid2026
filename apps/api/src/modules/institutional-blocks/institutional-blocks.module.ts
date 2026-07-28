import { Module } from '@nestjs/common';
import { InstitutionalBlocksController } from './institutional-blocks.controller';
import { InstitutionalBlocksService } from './institutional-blocks.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [InstitutionalBlocksController],
  providers: [InstitutionalBlocksService],
})
export class InstitutionalBlocksModule {}
