import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly service: AdminService) {}

  @Get('stats')
  getStats() {
    return this.service.getStats();
  }

  @Get('users')
  findUsers() {
    return this.service.findUsers();
  }

  @Post('users')
  createUser(@Body() dto: CreateUserDto) {
    return this.service.createUser(dto);
  }
}
