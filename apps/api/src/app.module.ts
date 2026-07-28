import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { ApplicationsModule } from './modules/applications/applications.module';
import { TechnologiesModule } from './modules/technologies/technologies.module';
import { IngredientsModule } from './modules/ingredients/ingredients.module';
import { LeadsModule } from './modules/leads/leads.module';
import { PartnersModule } from './modules/partners/partners.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ContentModule } from './modules/content/content.module';
import { UploadModule } from './modules/upload/upload.module';
import { AdminModule } from './modules/admin/admin.module';
import { InstitutionalPageModule } from './modules/institutional-page/institutional-page.module';
import { InstitutionalBlocksModule } from './modules/institutional-blocks/institutional-blocks.module';
import { SeoPagesModule } from './modules/seo-pages/seo-pages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    ApplicationsModule,
    TechnologiesModule,
    IngredientsModule,
    LeadsModule,
    PartnersModule,
    CategoriesModule,
    ContentModule,
    UploadModule,
    AdminModule,
    InstitutionalPageModule,
    InstitutionalBlocksModule,
    SeoPagesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
  ],
})
export class AppModule {}
