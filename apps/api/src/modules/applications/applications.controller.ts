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
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { SetRelationsDto } from './dto/set-relations.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly service: ApplicationsService) {}

  @Get()
  findAll(@Query('skip') skip = 0, @Query('take') take = 10) {
    return this.service.findAll(Number(skip), Number(take));
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.service.findBySlug(slug);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateApplicationDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateApplicationDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Put(':id/technologies')
  @UseGuards(JwtAuthGuard)
  setTechnologies(@Param('id') id: string, @Body() dto: SetRelationsDto) {
    return this.service.setTechnologies(id, dto.ids);
  }

  @Put(':id/ingredients')
  @UseGuards(JwtAuthGuard)
  setIngredients(@Param('id') id: string, @Body() dto: SetRelationsDto) {
    return this.service.setIngredients(id, dto.ids);
  }
}
