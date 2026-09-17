import {
  IsString,
  IsOptional,
  IsUrl,
  IsArray,
  ArrayMaxSize,
  MinLength,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

/** Um vídeo da página do parceiro — link do YouTube ou arquivo enviado pelo painel. */
export class PartnerVideoDto {
  @IsString()
  @MaxLength(500)
  url: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  title?: string;

  /** Imagem de capa do player, só faz sentido para arquivo próprio. */
  @IsOptional()
  @IsString()
  @MaxLength(500)
  poster?: string;
}

export class CreatePartnerDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  description: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  excerpt?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => PartnerVideoDto)
  videos?: PartnerVideoDto[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @IsUrl({}, { each: true })
  websites?: string[];

  @IsOptional()
  @IsString()
  @MaxLength(100)
  country?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  highlights?: string;
}
