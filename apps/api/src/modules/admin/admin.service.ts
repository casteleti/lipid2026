import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AdminService {
  constructor(private db: DatabaseService) {}

  async getStats() {
    const [applications, technologies, ingredients, partners, leads, content] = await Promise.all([
      this.db.application.count({ where: { active: true } }),
      this.db.technology.count({ where: { active: true } }),
      this.db.ingredient.count({ where: { active: true } }),
      this.db.partner.count({ where: { active: true } }),
      this.db.lead.count(),
      this.db.content.count({ where: { status: 'PUBLISHED' } }),
    ]);

    return { applications, technologies, ingredients, partners, leads, content };
  }

  findUsers() {
    return this.db.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        active: true,
        lastLogin: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createUser(data: CreateUserDto) {
    const exists = await this.db.user.findUnique({ where: { email: data.email } });
    if (exists) {
      throw new BadRequestException('Email já cadastrado');
    }

    const password = await bcrypt.hash(data.password, 10);

    const user = await this.db.user.create({
      data: { ...data, password, role: data.role || 'USER' },
    });

    return { id: user.id, email: user.email, name: user.name, role: user.role };
  }
}
