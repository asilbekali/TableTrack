import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(Role)
  role: Role;

  @IsNumber()
  restaurantId: number;

  @IsNumber()
  regionId: number;

  @IsString()
  @IsNotEmpty()
  password: string;
}
