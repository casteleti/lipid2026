import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

export class CreateIngredientDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  description: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  inci?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  supplier?: string;
}
