import { Module } from '@nestjs/common';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { RdStationService } from './rd-station.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [LeadsController],
  providers: [LeadsService, RdStationService],
})
export class LeadsModule {}
