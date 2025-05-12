import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiQuery,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/Guards/auth.guard';
import { RoleDec } from 'src/Decorators/roles.decorator';
import { Role } from 'src/user/enum/role.enum';
import { RolesGuard } from 'src/Guards/roles.guard';

@ApiTags('Product') 
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @RoleDec(Role.ADMIN, Role.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({
    description: 'Product data to create a new product',
    type: CreateProductDto,
    examples: {
      example1: {
        summary: 'Example product',
        value: {
          name: 'Burger',
          price: 10.5,
          categoryId: 1,
          restaurantId: 2,
        },
      },
    },
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Filter by product name',
  })
  @ApiOkResponse({
    description: 'Returns a paginated list of products.',
    schema: {
      example: {
        data: {
          pagenation: {
            totalItems: 50,
            totalPages: 5,
            currntPage: 1,
            itemsPerPage: 10,
          },
          product: [
            {
              id: 1,
              name: 'Burger',
              price: 10.5,
              categoryId: 1,
              restaurantId: 2,
              createdAt: '2023-05-01T10:00:00Z',
              updatedAt: '2023-05-02T12:00:00Z',
            },
            {
              id: 2,
              name: 'Pizza',
              price: 15.0,
              categoryId: 1,
              restaurantId: 2,
              createdAt: '2023-05-01T10:30:00Z',
              updatedAt: '2023-05-02T12:30:00Z',
            },
          ],
        },
      },
    },
  })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
    @Query('name') name?: string,
  ) {
    return this.productService.findAll({
      page,
      limit,
      name,
    });
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single product by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the product',
    example: 1,
  })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @RoleDec(Role.ADMIN, Role.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the product to update',
    example: 1,
  })
  @ApiBody({
    description: 'Updated product data',
    type: UpdateProductDto,
    examples: {
      example1: {
        summary: 'Update example',
        value: {
          name: 'Updated Burger',
          price: 12.0,
        },
      },
    },
  })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @RoleDec(Role.ADMIN, Role.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the product to delete',
    example: 1,
  })
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
