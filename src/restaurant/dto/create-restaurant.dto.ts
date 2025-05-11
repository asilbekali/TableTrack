import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsNumber()
  tip: number;

  @IsBoolean()
  inActive: boolean;
}
