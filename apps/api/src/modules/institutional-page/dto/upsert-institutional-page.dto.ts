import { IsOptional, IsString } from 'class-validator';

export class UpsertInstitutionalPageDto {
  @IsOptional()
  @IsString()
  heroEyebrow?: string;

  @IsOptional()
  @IsString()
  heroTitle?: string;

  @IsOptional()
  @IsString()
  heroDescription?: string;

  @IsOptional()
  @IsString()
  heroImage?: string;

  @IsOptional()
  @IsString()
  heroCtaPrimaryLabel?: string;

  @IsOptional()
  @IsString()
  heroCtaPrimaryHref?: string;

  @IsOptional()
  @IsString()
  heroCtaSecondaryLabel?: string;

  @IsOptional()
  @IsString()
  heroCtaSecondaryHref?: string;

  @IsOptional()
  @IsString()
  quemSomosIntro?: string;

  @IsOptional()
  @IsString()
  comoAjudamosCta?: string;

  @IsOptional()
  @IsString()
  parceriaText?: string;

  @IsOptional()
  @IsString()
  qualidadeText?: string;

  @IsOptional()
  @IsString()
  historiaText?: string;

  @IsOptional()
  @IsString()
  ctaFinalHeading?: string;

  @IsOptional()
  @IsString()
  ctaFinalText?: string;

  @IsOptional()
  @IsString()
  ctaFinalPrimaryLabel?: string;

  @IsOptional()
  @IsString()
  ctaFinalPrimaryHref?: string;

  @IsOptional()
  @IsString()
  ctaFinalSecondaryLabel?: string;

  @IsOptional()
  @IsString()
  ctaFinalSecondaryHref?: string;
}
