import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { InstitutionalSectionsService } from './institutional-sections.service';
import { UpdateInstitutionalSectionDto } from './dto/update-institutional-section.dto';
import { CreateInstitutionalSectionItemDto } from './dto/create-institutional-section-item.dto';
import { UpdateInstitutionalSectionItemDto } from './dto/update-institutional-section-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('institutional-sections')
export class InstitutionalSectionsController {
  constructor(private readonly service: InstitutionalSectionsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateInstitutionalSectionDto) {
    return this.service.update(id, dto);
  }

  @Post(':id/items')
  @UseGuards(JwtAuthGuard)
  createItem(@Param('id') id: string, @Body() dto: CreateInstitutionalSectionItemDto) {
    return this.service.createItem(id, dto);
  }

  @Put('items/:itemId')
  @UseGuards(JwtAuthGuard)
  updateItem(@Param('itemId') itemId: string, @Body() dto: UpdateInstitutionalSectionItemDto) {
    return this.service.updateItem(itemId, dto);
  }

  @Delete('items/:itemId')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  removeItem(@Param('itemId') itemId: string) {
    return this.service.removeItem(itemId);
  }
}
