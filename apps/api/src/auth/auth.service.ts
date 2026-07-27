import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateToken(payload: { id: string; email: string; role: string }) {
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: process.env.JWT_EXPIRY || '24h',
      }),
    };
  }

  async validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      return null;
    }
  }
}
