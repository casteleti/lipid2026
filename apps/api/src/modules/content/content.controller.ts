import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('content')
export class ContentController {
  constructor(private readonly service: ContentService) {}

  @Get()
  findAll(
    @Query('skip') skip = 0,
    @Query('take') take = 10,
    @Query('status') status?: string,
    @Query('q') q?: string,
    @Query('category') category?: string,
    @Query('tipo') tipo?: string,
  ) {
    return this.service.findAll(Number(skip), Number(take), status, q, category, tipo);
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.service.findBySlug(slug);
  }

  @Get('slug/:slug/relacionados')
  findRelacionados(@Param('slug') slug: string, @Query('limite') limite = 3) {
    return this.service.findRelacionados(slug, Number(limite));
  }

  /** Libera as URLs do material contra um lead já gravado para este conteúdo. */
  @Get('slug/:slug/arquivos')
  arquivosLiberados(@Param('slug') slug: string, @Query('lead') leadId: string) {
    return this.service.arquivosLiberados(slug, leadId);
  }

  /** Telemetria pública, chamada pela leitura. */
  @Post('slug/:slug/visita')
  @HttpCode(204)
  registrarVisita(@Param('slug') slug: string) {
    return this.service.registrarVisita(slug);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateContentDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateContentDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
