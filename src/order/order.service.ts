import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOrderDto, req: Request) {
    const bazaRestaran = await this.prisma.restaurant.findFirst({
      where: { id: dto.restaurantId },
    });

    if (!bazaRestaran) {
      throw new BadRequestException('Wrong restaran ID');
    }

    const bazaWaiter = await this.prisma.user.findFirst({
      where: { id: req['user'].id },
    });

    if (!bazaWaiter) {
      throw new BadRequestException('Wrong waiter ID');
    }

    for (const data of dto.orderItemId) {
      const OI = await this.prisma.orderItem.findFirst({ where: { id: data } });
      if (!OI) {
        throw new BadRequestException('Wrong order iteam ID');
      }
    }

    // return await this.prisma.order.create({
    //   data: {
    //     table: dto.table,
    //     status: 'PENDING',
    //     restaurantId: dto.restaurantId,
    //     waiterId: req['user'].id,
    //   },
    // });
  }

  async findAll({ restaurantId, table, page, limit }) {
    return `This action returns all order`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
