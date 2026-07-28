import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpsertSeoPageDto {
  @IsOptional()
  @IsString()
  @MaxLength(70)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  keywords?: string;

  @IsOptional()
  @IsString()
  ogImage?: string;
}
