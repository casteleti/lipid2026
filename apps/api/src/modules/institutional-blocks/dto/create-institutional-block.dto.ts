import { IsEnum, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { InstitutionalBlockSection } from '@prisma/client';

export class CreateInstitutionalBlockDto {
  @IsEnum(InstitutionalBlockSection)
  section: InstitutionalBlockSection;

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
  @MaxLength(100)
  value?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @IsOptional()
  @IsInt()
  order?: number;
}
