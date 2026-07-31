import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { LeadSector } from '@prisma/client';

export class CreatePageViewDto {
  @IsString()
  @MaxLength(300)
  route: string;

  @IsOptional()
  @IsEnum(LeadSector)
  sector?: LeadSector;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  referrer?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  utmSource?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  utmMedium?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  utmCampaign?: string;
}
