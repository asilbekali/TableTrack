import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Role } from 'src/user/enum/role.enum';

export class CreateAuthDto {
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
