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
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly service: IngredientsService) {}

  @Get()
  findAll(
    @Query('skip') skip = 0,
    @Query('take') take = 10,
    @Query('q') q?: string,
    @Query('categoria') categorySlug?: string,
    @Query('tag') tagSlug?: string,
    @Query('fabricante') partnerSlug?: string,
  ) {
    return this.service.findAll(Number(skip), Number(take), {
      q,
      categorySlug,
      tagSlug,
      partnerSlug,
    });
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.service.findBySlug(slug);
  }

  @Get('slug/:slug/similares')
  findSimilares(@Param('slug') slug: string, @Query('limite') limite = 4) {
    return this.service.findSimilares(slug, Number(limite));
  }

  /** Telemetria pública, chamada pela ficha. Sem guard: é visitante anônimo. */
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
  create(@Body() dto: CreateIngredientDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateIngredientDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
