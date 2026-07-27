import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateToken(payload: { id: string; email: string; role: string }) {
    const expiresIn = (process.env.JWT_EXPIRY || '24h') as JwtSignOptions['expiresIn'];
    return {
      access_token: this.jwtService.sign(payload, { expiresIn }),
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
