import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
  ApiExtraModels,
} from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@ApiTags('Order')
@Controller('order')
@ApiExtraModels(CreateOrderDto, UpdateOrderDto)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({
    status: 201,
    description: 'Order successfully created.',
    schema: {
      example: {
        id: 1,
        restaurantId: 1,
        table: '7',
        orderItemId: [1, 2, 3, 5],
      },
    },
  })
  @ApiBody({
    type: CreateOrderDto,
    examples: {
      example1: {
        value: {
          restaurantId: '123',
          table: '7',
          orderItemId: [1, 2, 3, 5],
        },
      },
    },
  })
  create(@Body() createOrderDto: CreateOrderDto, @Request() req: Request) {
    return this.orderService.create(createOrderDto, req);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all orders with filters and pagination' })
  @ApiResponse({
    status: 200,
    description: 'List of orders retrieved successfully.',
  })
  @ApiQuery({ name: 'restaurantId', required: false })
  @ApiQuery({ name: 'table', required: false })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  findAll(
    @Query('restaurantId') restaurantId?: string,
    @Query('table') table?: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    return this.orderService.findAll({ restaurantId, table, page, limit });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific order by ID' })
  @ApiResponse({ status: 200, description: 'Order retrieved successfully.' })
  @ApiParam({ name: 'id', example: 1 })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing order by ID' })
  @ApiResponse({ status: 200, description: 'Order updated successfully.' })
  @ApiBody({ type: UpdateOrderDto })
  @ApiParam({ name: 'id', example: 1 })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order by ID' })
  @ApiResponse({ status: 200, description: 'Order deleted successfully.' })
  @ApiParam({ name: 'id', example: 1 })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.remove(id);
  }
}
