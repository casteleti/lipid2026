import {
  IsString,
  IsOptional,
  IsArray,
  IsInt,
  Min,
  ArrayMaxSize,
  MinLength,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class IngredientImageDto {
  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  alt?: string;
}

export class IngredientFileDto {
  @IsString()
  url: string;

  @IsString()
  @MaxLength(200)
  label: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  sizeBytes?: number;
}

export class CreateIngredientDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsString()
  @MinLength(10)
  @MaxLength(5000)
  description: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  excerpt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  inci?: string;

  @IsOptional()
  @IsString()
  partnerId?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  /** Códigos comerciais. Substituem os existentes quando enviados (sync, não append). */
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  codes?: string[];

  /** Ids de tags. Idem: substituem o conjunto atual. */
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  tagIds?: string[];

  /** Galeria. Também é sync: o que não vier é removido. */
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => IngredientImageDto)
  images?: IngredientImageDto[];

  /** Anexos PDF (ficha técnica, especificação, certificado). Sync também. */
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => IngredientFileDto)
  files?: IngredientFileDto[];
}
