import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateLeadDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  company?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(2000)
  message?: string;
}
