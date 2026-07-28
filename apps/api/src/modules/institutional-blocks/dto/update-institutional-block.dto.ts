import { PartialType } from '@nestjs/mapped-types';
import { CreateInstitutionalBlockDto } from './create-institutional-block.dto';

export class UpdateInstitutionalBlockDto extends PartialType(CreateInstitutionalBlockDto) {}
