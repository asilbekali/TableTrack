import {
  IsArray,
  IsInt,
  IsNotEmpty,
  ArrayMinSize,
  IsString,
  IsNumber,
} from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  restaurantId: number;

  @IsString()
  @IsNotEmpty()
  table: string;

  @IsArray()
  @IsInt({ each: true })
  @ArrayMinSize(1)
  orderItemId: number[]; 
}
