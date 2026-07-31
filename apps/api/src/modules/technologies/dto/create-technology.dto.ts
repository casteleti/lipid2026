import { IsArray, IsBoolean, IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

export class CreateTechnologyDto {
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
  @MaxLength(500)
  excerpt?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  // ------------------------------------------------------------------ LANDING PAGE
  // Mesma estrutura editorial das páginas de segmento: hero, essência e formulário.

  @IsOptional()
  @IsString()
  @MaxLength(120)
  eyebrow?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  h1?: string;

  @IsOptional()
  @IsString()
  @MaxLength(600)
  subheadline?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  heroCtaLabel?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  imageOneUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  imageOneAlt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  imageOneCaption?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  imageTwoUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  imageTwoAlt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  imageTwoCaption?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  essenceTitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1200)
  essenceIntro?: string;

  /** {title, description}[] */
  @IsOptional()
  @IsArray()
  pillars?: { title: string; description: string }[];

  @IsOptional()
  @IsString()
  @MaxLength(200)
  criteriaTitle?: string;

  /** {label, description}[] */
  @IsOptional()
  @IsArray()
  criteria?: { label: string; description: string }[];

  @IsOptional()
  @IsString()
  @MaxLength(600)
  authorityStatement?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  formEyebrow?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  formTitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  formDescription?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  formValueProposition?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  formCtaLabel?: string;

  @IsOptional()
  @IsString()
  @MaxLength(600)
  formSuccessMessage?: string;

  @IsOptional()
  @IsArray()
  formChallengeOptions?: string[];

  @IsOptional()
  @IsString()
  @MaxLength(200)
  seoTitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  seoDescription?: string;

  @IsOptional()
  @IsArray()
  seoKeywords?: string[];
}
