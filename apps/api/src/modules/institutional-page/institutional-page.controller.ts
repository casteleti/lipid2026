import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { InstitutionalPageService } from './institutional-page.service';
import { UpsertInstitutionalPageDto } from './dto/upsert-institutional-page.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('institutional-page')
export class InstitutionalPageController {
  constructor(private readonly service: InstitutionalPageService) {}

  @Get()
  getFull() {
    return this.service.getFull();
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  upsert(@Body() dto: UpsertInstitutionalPageDto) {
    return this.service.upsert(dto);
  }
}
