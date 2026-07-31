import {
  IsString,
  IsOptional,
  IsArray,
  IsIn,
  IsInt,
  Min,
  MinLength,
  MaxLength,
  ArrayMaxSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ContentSummaryPointDto {
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  text: string;
}

export class ContentFaqDto {
  @IsString()
  @MinLength(3)
  @MaxLength(300)
  question: string;

  @IsString()
  @MinLength(3)
  @MaxLength(2000)
  answer: string;
}

export class ContentFileDto {
  @IsString()
  url: string;

  @IsString()
  @MaxLength(200)
  label: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  sizeBytes?: number;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  mimetype?: string;
}

export class CreateContentDto {
  @IsOptional()
  @IsIn(['ARTIGO', 'DOWNLOAD'])
  type?: 'ARTIGO' | 'DOWNLOAD';

  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title: string;

  /**
   * Vazio é permitido: um DOWNLOAD é a peça em si, o texto é opcional. A obrigatoriedade
   * do artigo é validada no formulário do painel, onde dá para explicar o motivo.
   */
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  excerpt?: string;

  @IsOptional()
  @IsString()
  featured?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  featuredAlt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  author?: string;

  @IsOptional()
  @IsIn(['DRAFT', 'PUBLISHED', 'ARCHIVED'])
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

  @IsOptional()
  @IsString()
  @MaxLength(200)
  seoTitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  seoDescription?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categoryIds?: string[];

  /** Tópicos do resumo. Enviados como conjunto completo (sync). */
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => ContentSummaryPointDto)
  summaryPoints?: ContentSummaryPointDto[];

  /** Perguntas frequentes. Sync também. */
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(30)
  @ValidateNested({ each: true })
  @Type(() => ContentFaqDto)
  faqs?: ContentFaqDto[];

  /** Materiais do tipo DOWNLOAD. Sync também. */
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => ContentFileDto)
  files?: ContentFileDto[];
}
