import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello from Daksa API!';
  }

  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'lipid-api',
      version: '1.0.0',
    };
  }
}
