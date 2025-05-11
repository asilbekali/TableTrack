import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateOrderDto, userId: number) {
    const { restaurantId, orderItems, table } = dto;

    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });
    if (!restaurant) throw new NotFoundException('Restaurant not found');

    for (const productId of orderItems) {
      const product = await this.prisma.product.findUnique({
        where: { id: productId },
      });
      if (!product)
        throw new BadRequestException(`Product not found: ${productId}`);
    }

    const order = await this.prisma.order.create({
      data: {
        table,
        status: 'PENDING',
        restaurantId,
        waiterId: userId,
        orderItems: {
          create: orderItems.map((productId) => ({
            productId,
            quantity: 1, 
          })),
        },
      },
      include: { orderItems: true },
    });

    return order;
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        waiter: true,
        restaurant: true,
      },
    });
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: {
          include: { product: true },
        },
        waiter: true,
      },
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async update(id: number, dto: UpdateOrderDto) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');

    return this.prisma.order.update({
      where: { id },
      data: {
        table: dto.table,
        restaurantId: dto.restaurantId,
        ...(dto.orderItems?.length && {
          orderItems: {
            deleteMany: {},
            create: dto.orderItems.map((productId) => ({
              productId,
              quantity: 1,
            })),
          },
        }),
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.order.delete({ where: { id } });
  }
}
