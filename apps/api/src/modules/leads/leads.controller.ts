import { Controller, Post, Get, Body, Query, UseGuards } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('leads')
export class LeadsController {
  constructor(private readonly service: LeadsService) {}

  /** Público: é o envio dos formulários do site. */
  @Post()
  create(@Body() dto: CreateLeadDto) {
    return this.service.create(dto);
  }

  /** `stats` vem antes de qualquer rota com parâmetro para não ser capturada por ela. */
  @Get('stats')
  @UseGuards(JwtAuthGuard)
  stats() {
    return this.service.stats();
  }

  /** Valores que existem de fato nos leads — alimenta os selects de filtro do painel. */
  @Get('filtros')
  @UseGuards(JwtAuthGuard)
  filterOptions() {
    return this.service.filterOptions();
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(
    @Query('skip') skip = 0,
    @Query('take') take = 30,
    @Query('q') q?: string,
    @Query('pagina') pagina?: string,
    @Query('sector') sector?: string,
    @Query('source') source?: string,
    @Query('dias') dias?: string,
  ) {
    return this.service.findAll(Number(skip), Number(take), {
      q: q || undefined,
      pagina: pagina || undefined,
      sector: sector || undefined,
      source: source || undefined,
      dias: dias ? Number(dias) : undefined,
    });
  }
}
