import { BadRequestException, Body, Controller, Get, Put, Query, UseGuards } from '@nestjs/common';
import { SeoPagesService } from './seo-pages.service';
import { UpsertSeoPageDto } from './dto/upsert-seo-page.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('seo-pages')
export class SeoPagesController {
  constructor(private readonly service: SeoPagesService) {}

  @Get()
  findByRoute(@Query('route') route?: string) {
    if (!route) {
      throw new BadRequestException('Parâmetro "route" é obrigatório');
    }

    return this.service.findByRoute(route);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  upsert(@Query('route') route: string, @Body() dto: UpsertSeoPageDto) {
    if (!route) {
      throw new BadRequestException('Parâmetro "route" é obrigatório');
    }

    return this.service.upsertByRoute(route, dto);
  }
}
