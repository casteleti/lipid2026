import { IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { LeadSector } from '@prisma/client';

export class CreateLeadDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  company?: string;

  @IsOptional()
  @IsEnum(LeadSector)
  sector?: LeadSector;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(2000)
  message?: string;

  /** Preenchido pelo formulário da ficha de produto — marca o lead como qualificado. */
  @IsOptional()
  @IsString()
  ingredientId?: string;

  /** Material baixado — preenchido pelo formulário que libera o download. */
  @IsOptional()
  @IsString()
  contentId?: string;

  /** Página que converteu. Todo formulário do site envia as duas. */
  @IsOptional()
  @IsString()
  @MaxLength(500)
  pageUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  pageTitle?: string;

  /** Rota normalizada da landing (ex.: "/tecnologias/lipossomas") — é o que cruza com
   * `page_views.route` no relatório de acessos × conversão por página. */
  @IsOptional()
  @IsString()
  @MaxLength(300)
  landingRoute?: string;
}
