import { IsBoolean, IsInt, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateInstitutionalSectionDto {
  @IsOptional()
  @IsInt()
  order?: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  eyebrow?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  subtitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(6000)
  body?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  highlight?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  quote?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  ctaLabel?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  ctaHref?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  secondaryCtaLabel?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  secondaryCtaHref?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  imageHint?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsObject()
  extra?: Record<string, unknown>;
}
