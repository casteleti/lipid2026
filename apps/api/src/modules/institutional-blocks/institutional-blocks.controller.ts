import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { InstitutionalBlockSection } from '@prisma/client';
import { InstitutionalBlocksService } from './institutional-blocks.service';
import { CreateInstitutionalBlockDto } from './dto/create-institutional-block.dto';
import { UpdateInstitutionalBlockDto } from './dto/update-institutional-block.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

const VALID_SECTIONS = Object.values(InstitutionalBlockSection);

@Controller('institutional-blocks')
export class InstitutionalBlocksController {
  constructor(private readonly service: InstitutionalBlocksService) {}

  @Get()
  findAll(@Query('section') section?: string) {
    if (section && !VALID_SECTIONS.includes(section as InstitutionalBlockSection)) {
      throw new BadRequestException(`Seção inválida: ${section}`);
    }

    return this.service.findAll(section as InstitutionalBlockSection | undefined);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateInstitutionalBlockDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateInstitutionalBlockDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
