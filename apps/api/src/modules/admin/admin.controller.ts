import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly service: AdminService) {}

  @Get('stats')
  getStats() {
    return this.service.getStats();
  }

  // Gestão de usuários fica restrita a ADMIN: é o endpoint que permite escolher o próprio
  // papel ao criar uma conta (ver auditoria — qualquer logado conseguia se promover a ADMIN).
  @Get('users')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  findUsers() {
    return this.service.findUsers();
  }

  @Post('users')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  createUser(@Body() dto: CreateUserDto) {
    return this.service.createUser(dto);
  }
}
