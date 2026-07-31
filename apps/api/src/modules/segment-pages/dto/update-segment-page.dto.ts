import { IsArray, IsBoolean, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateSegmentPageDto {
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
  @MaxLength(300)
  h1?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  subheadline?: string;

  @IsOptional()
  @IsArray()
  salesParagraphs?: string[];

  @IsOptional()
  @IsString()
  @MaxLength(300)
  applicationsTitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  applicationsIntro?: string;

  @IsOptional()
  @IsArray()
  applications?: { title: string; description: string }[];

  @IsOptional()
  @IsString()
  @MaxLength(500)
  floatingHighlight?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  ingredientExplorerHeadline?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  ingredientExplorerSupportingText?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
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
  @MaxLength(100)
  formCtaLabel?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
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
