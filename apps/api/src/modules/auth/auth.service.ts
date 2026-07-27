import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { DatabaseService } from '../database/database.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

const TOKEN_EXPIRY_SECONDS = 86400; // 24h

@Injectable()
export class AuthService {
  constructor(
    private db: DatabaseService,
    private jwt: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.db.user.findUnique({ where: { email: dto.email } });

    if (!user) {
      throw new UnauthorizedException('Email ou senha incorretos');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou senha incorretos');
    }

    if (!user.active) {
      throw new UnauthorizedException('Conta não ativa');
    }

    const token = this.jwt.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    await this.db.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    return {
      access_token: token,
      expires_in: TOKEN_EXPIRY_SECONDS,
      user: { id: user.id, email: user.email, name: user.name },
    };
  }

  async register(dto: RegisterDto): Promise<AuthResponseDto> {
    const exists = await this.db.user.findUnique({ where: { email: dto.email } });

    if (exists) {
      throw new BadRequestException('Email já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.db.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: hashedPassword,
        role: 'USER',
      },
    });

    const token = this.jwt.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      access_token: token,
      expires_in: TOKEN_EXPIRY_SECONDS,
      user: { id: user.id, email: user.email, name: user.name },
    };
  }
}
