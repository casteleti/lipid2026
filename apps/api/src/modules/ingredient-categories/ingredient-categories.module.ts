import { Module } from '@nestjs/common';
import { IngredientCategoriesController } from './ingredient-categories.controller';
import { IngredientCategoriesService } from './ingredient-categories.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [IngredientCategoriesController],
  providers: [IngredientCategoriesService],
})
export class IngredientCategoriesModule {}
