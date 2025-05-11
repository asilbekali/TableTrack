import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@ApiTags('Regions') 
@Controller('regions')
export class RegionController {
  constructor(private readonly service: RegionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new region' })
  @ApiResponse({
    status: 201,
    description: 'The region has been successfully created.',
    examples: {
      example1: {
        summary: 'Example Request Body',
        value: {
          name: 'Tashkent Region',
        },
      },
    },
  })
  create(@Body() dto: CreateRegionDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all regions' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of all regions.',
    examples: {
      example1: {
        summary: 'Example Response',
        value: [
          { id: 1, name: 'Tashkent Region' },
          { id: 2, name: 'Andijan Region' },
        ],
      },
    },
  })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific region by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the details of a specific region.',
    examples: {
      example1: {
        summary: 'Example Response',
        value: { id: 1, name: 'Tashkent Region' },
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific region by ID' })
  @ApiResponse({
    status: 200,
    description: 'The region has been successfully updated.',
    examples: {
      example1: {
        summary: 'Example Request Body',
        value: {
          name: 'Updated Tashkent Region',
        },
      },
    },
  })
  update(@Param('id') id: string, @Body() dto: UpdateRegionDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific region by ID' })
  @ApiResponse({
    status: 200,
    description: 'The region has been successfully deleted.',
    examples: {
      example1: {
        summary: 'Example Response',
        value: { message: 'Region with ID 1 has been deleted' },
      },
    },
  })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
