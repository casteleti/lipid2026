import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { mkdirSync } from 'fs';
import { AppModule } from './app.module';
import { UPLOADS_DIR } from './modules/upload/upload.controller';

async function bootstrap() {
  mkdirSync(UPLOADS_DIR, { recursive: true });

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(UPLOADS_DIR, { prefix: '/uploads/' });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://lipid.daksa.app.br',
      'https://cms.daksa.app.br',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  });

  // "/" e "/health" ficam sem prefixo (usados pelo healthcheck do Coolify)
  app.setGlobalPrefix('api/v1', { exclude: ['/', 'health'] });

  const port = process.env.API_PORT || 3002;
  await app.listen(port);

  console.log(`Daksa API running on http://localhost:${port}`);
}

bootstrap().catch((err) => {
  console.error('Failed to start app:', err);
  process.exit(1);
});
