import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCategoryDto) {
    const { restaurantId, name } = dto;

    const bazaRes = await this.prisma.restaurant.findFirst({
      where: { id: restaurantId },
    });

    if (bazaRes) {
      throw new BadRequestException('Category name must be uniq !');
    }
    if (!restaurantId) {
      throw new BadRequestException('Need restaran ID');
    }

    const bazaRestaran = await this.prisma.restaurant.findFirst({
      where: { id: restaurantId },
    });

    if (!bazaRestaran) {
      throw new BadRequestException('Wrong restarab ID');
    }

    return await this.prisma.category.create({
      data: {
        name,
        restaurantId,
      },
    });
  }

  async findAll({ page, limit, name, restaurantId }) {
    const offset = (page - 1) * limit;

    const where: any = {};

    if (name) {
      where.name = { contains: name, mode: 'insensitive' };
    }

    if (restaurantId) {
      where.restaurantId = Number(restaurantId);
    }

    const totalItems = await this.prisma.category.count({ where });

    const data = await this.prisma.category.findMany({
      skip: offset,
      take: limit,
      where,
    });

    return {
      data: {
        pagination: {
          totalItems,
          totalPages: Math.ceil(totalItems / limit),
          currentPage: page,
          itemsPerPage: limit,
        },
        categories: data,
      },
    };
  }

  async findOne(id: number) {
    const bazaCategory = await this.prisma.category.findFirst({
      where: { id },
    });

    if (!bazaCategory) {
      throw new BadRequestException('Category not found');
    }
    return bazaCategory;
  }

  async update(id: number, upDto: UpdateCategoryDto) {
    const bazaCategory = await this.prisma.category.findFirst({
      where: { id },
    });

    if (!bazaCategory) {
      throw new BadRequestException('Category not found');
    }

    const bazaRes = await this.prisma.category.findFirst({
      where: { id: upDto.restaurantId },
    });

    if (!bazaRes) {
      throw new BadRequestException('Wrong restaran ID');
    }

    return this.prisma.category.update({ where: { id }, data: upDto });
  }

  async remove(id: number) {
    const bazaCategory = await this.prisma.category.findFirst({
      where: { id },
    });

    if (!bazaCategory) {
      throw new BadRequestException('Category not found');
    }

    return {deletedCategory: await this.prisma.category.delete({ where: { id } })}
  }
}
