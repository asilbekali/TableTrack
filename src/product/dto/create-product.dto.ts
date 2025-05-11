import { IsNotEmpty, IsNumber, IsBoolean, IsInt } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;

  @IsInt()
  categoryId: number;

  @IsInt()
  restaurantId: number;

  @IsBoolean()
  inActive: boolean;
}
