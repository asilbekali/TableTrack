import { IsArray, IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  table: string;

  @IsArray()
  @IsInt({ each: true })
  orderItems: number[];

  @IsInt()
  restaurantId: number;
}
