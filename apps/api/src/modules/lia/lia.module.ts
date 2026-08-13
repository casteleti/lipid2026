import { Module } from '@nestjs/common';
import { LiaController } from './lia.controller';
import { LiaService } from './lia.service';
import { LiaRateLimitGuard } from './lia-rate-limit.guard';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [LiaController],
  providers: [LiaService, LiaRateLimitGuard],
})
export class LiaModule {}
