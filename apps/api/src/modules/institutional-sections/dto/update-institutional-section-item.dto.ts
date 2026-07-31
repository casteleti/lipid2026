import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateInstitutionalSectionItemDto } from './create-institutional-section-item.dto';

export class UpdateInstitutionalSectionItemDto extends PartialType(CreateInstitutionalSectionItemDto) {
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
