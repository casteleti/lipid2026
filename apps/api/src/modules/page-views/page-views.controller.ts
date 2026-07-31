import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { PageViewsService } from './page-views.service';
import { CreatePageViewDto } from './dto/create-page-view.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('page-views')
export class PageViewsController {
  constructor(private readonly service: PageViewsService) {}

  @Post()
  @HttpCode(204)
  async create(@Body() dto: CreatePageViewDto) {
    await this.service.create(dto);
  }

  @Get('summary')
  @UseGuards(JwtAuthGuard)
  summary() {
    return this.service.summaryBySegment();
  }

  @Get('summary/technologies')
  @UseGuards(JwtAuthGuard)
  summaryTechnologies() {
    return this.service.summaryByTechnology();
  }
}
