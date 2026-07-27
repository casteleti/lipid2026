import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Injectable()
export class LeadsService {
  constructor(private db: DatabaseService) {}

  create(data: CreateLeadDto) {
    return this.db.lead.create({
      data: { ...data, source: 'website' },
    });
  }
}
