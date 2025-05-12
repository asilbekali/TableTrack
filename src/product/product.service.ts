import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
    const bazaCategory = await this.prisma.category.findFirst({
      where: { id: dto.categoryId },
    });

    if (!bazaCategory) {
      throw new BadRequestException('Category not found');
    }

    const bazaRestaran = await this.prisma.restaurant.findFirst({
      where: { id: dto.restaurantId },
    });

    if (!bazaRestaran) {
      throw new BadRequestException('Restaran not found !');
    }

    return await this.prisma.product.create({
      data: {
        inActive: true,
        name: dto.name,
        restaurantId: dto.restaurantId,
        categoryId: dto.categoryId,
        price: dto.price,
      },
    });
  }

  async findAll({ page, limit, name }) {
    const offset = (page - 1) * limit;

    const where: any = {};

    if (name) {
      where.name = { contains: name, mode: 'insensitive' };
    }

    const totalItems = await this.prisma.product.count({ where });

    const data = await this.prisma.category.findMany({
      skip: offset,
      take: limit,
      where,
    });

    return {
      data: {
        pagenation: {
          totalItems,
          totalPages: Math.ceil(totalItems / limit),
          currntPage: page,
          itemsPerPage: limit,
        },
        product: data,
      },
    };
  }

  async findOne(id: number) {
    const bazaPro = await this.prisma.product.findFirst({ where: { id } });
    if (!bazaPro) {
      throw new BadRequestException('Product not found');
    }

    return bazaPro;
  }

  async update(id: number, dto: UpdateProductDto) {
    const bazaCategory = await this.prisma.category.findFirst({
      where: { id: dto.categoryId },
    });

    if (!bazaCategory) {
      throw new BadRequestException('Category not found');
    }

    const bazaRestaran = await this.prisma.restaurant.findFirst({
      where: { id: dto.restaurantId },
    });

    if (!bazaRestaran) {
      throw new BadRequestException('Restaran not found !');
    }

    const bazaPro = await this.prisma.product.findFirst({ where: { id } });

    if (!bazaPro) {
      throw new BadRequestException('Product not found ');
    }

    return await this.prisma.product.update({
      where: { id },
      data: {
        name: dto.name,
        price: dto.price,
        categoryId: dto.categoryId,
        restaurantId: dto.restaurantId,
      },
    });
  }

  async remove(id: number) {
    const bazaPro = await this.prisma.product.findFirst({ where: { id } });

    if (!bazaPro) {
      throw new BadRequestException('Product not found ');
    }
    return {
      deletedProduct: await this.prisma.product.delete({ where: { id } }),
    };
  }
}
