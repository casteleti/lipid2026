import { IsInt, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateInstitutionalSectionItemDto {
  @IsOptional()
  @IsInt()
  order?: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  icon?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  subtitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(3000)
  text?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  value?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  linkLabel?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  linkHref?: string;

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
