import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';

export class CreatePasswordDto {
  @IsString()
  password: string;

  @IsString()
  account: string;

  @IsNumber()
  userId: number;
}

export class UpdatePasswordDto extends PartialType(CreatePasswordDto) {}
