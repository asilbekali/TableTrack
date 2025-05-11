import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from 'src/common/tokenCheck/auth.guard';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({
    status: 201,
    description: 'Order created successfully.',
    content: {
      'application/json': {
        examples: {
          success: {
            summary: 'Successful Order Creation',
            value: {
              id: 1,
              title: 'New Order',
              OrderOrderItems: [1, 2, 3],
              userId: 123,
              createdAt: '2025-05-11T12:00:00Z',
            },
          },
        },
      },
    },
  })
  @ApiBody({
    description: 'Create order payload',
    examples: {
      newOrder: {
        summary: 'Order with OrderItems',
        value: {
          title: 'Order Title',
          OrderOrderItems: [1, 2, 3],
        },
      },
    },
  })
  @Post()
  create(@Body() dto: CreateOrderDto, @Req() req: any) {
    const userId = req.user?.userId;
    return this.orderService.create(dto, userId);
  }

  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({
    status: 200,
    description: 'List of all orders.',
    content: {
      'application/json': {
        examples: {
          success: {
            summary: 'Orders List',
            value: [
              { id: 1, title: 'Order 1', OrderItems: [1, 2], userId: 123 },
              { id: 2, title: 'Order 2', OrderItems: [3, 4], userId: 124 },
            ],
          },
        },
      },
    },
  })
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiResponse({
    status: 200,
    description: 'Order details.',
    content: {
      'application/json': {
        examples: {
          success: {
            summary: 'Order Details',
            value: {
              id: 1,
              title: 'Order Title',
              OrderItems: [1, 2, 3, 4],
              userId: 123,
              createdAt: '2025-05-11T12:00:00Z',
            },
          },
        },
      },
    },
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an order by ID' })
  @ApiResponse({
    status: 200,
    description: 'Order updated successfully.',
    content: {
      'application/json': {
        examples: {
          success: {
            summary: 'Successful Order Update',
            value: {
              id: 1,
              title: 'Updated Order Title',
              OrderItems: [2, 3, 4],
              userId: 123,
              updatedAt: '2025-05-11T12:00:00Z',
            },
          },
        },
      },
    },
  })
  @ApiBody({
    description: 'Update order payload',
    examples: {
      updateOrder: {
        summary: 'Update an order',
        value: {
          title: 'Updated Order Title',
          OrderItems: [2, 3, 4],
        },
      },
    },
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return this.orderService.update(+id, dto);
  }

  @ApiOperation({ summary: 'Delete an order by ID' })
  @ApiResponse({
    status: 200,
    description: 'Order deleted successfully.',
    content: {
      'application/json': {
        examples: {
          success: {
            summary: 'Successful Order Deletion',
            value: { message: 'Order deleted successfully' },
          },
        },
      },
    },
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
