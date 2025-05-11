import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRegionDto {
  @ApiProperty({
    description: 'The name of the region',
    example: 'Tashkent Region',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
