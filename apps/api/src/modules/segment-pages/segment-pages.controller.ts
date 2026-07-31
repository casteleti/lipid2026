import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { SegmentPagesService } from './segment-pages.service';
import { UpdateSegmentPageDto } from './dto/update-segment-page.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('segment-pages')
export class SegmentPagesController {
  constructor(private readonly service: SegmentPagesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':idOrSlug')
  findOne(@Param('idOrSlug') idOrSlug: string) {
    return this.service.findOne(idOrSlug);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateSegmentPageDto) {
    return this.service.update(id, dto);
  }
}
