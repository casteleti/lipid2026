import { Controller, Get, Param, Query } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly service: IngredientsService) {}

  @Get()
  findAll(@Query('skip') skip = 0, @Query('take') take = 10) {
    return this.service.findAll(Number(skip), Number(take));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
