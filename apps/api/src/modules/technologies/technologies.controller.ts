import { Controller, Get, Param, Query } from '@nestjs/common';
import { TechnologiesService } from './technologies.service';

@Controller('technologies')
export class TechnologiesController {
  constructor(private readonly service: TechnologiesService) {}

  @Get()
  findAll(@Query('skip') skip = 0, @Query('take') take = 10) {
    return this.service.findAll(Number(skip), Number(take));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
