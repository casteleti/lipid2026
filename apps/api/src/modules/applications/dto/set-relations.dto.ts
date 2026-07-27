import { IsArray, IsString } from 'class-validator';

export class SetRelationsDto {
  @IsArray()
  @IsString({ each: true })
  ids: string[];
}
