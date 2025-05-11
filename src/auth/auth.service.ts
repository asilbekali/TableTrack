import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async findUser(name: string) {
    const user = await this.prisma.user.findFirst({
      where: { name },
    });
    return user;
  }

  async register(data: CreateAuthDto) {
    const existingUser = await this.findUser(data.name);
    if (existingUser) {
      throw new BadRequestException('User already exists!');
    }

    const hashedPassword = bcrypt.hashSync(data.password, 10);

    const bazaRegion = await this.prisma.region.findFirst({
      where: { id: data.regionId },
    });

    if (!bazaRegion) {
      throw new BadRequestException('Wrong region ID');
    }
    const bazaRetaran = await this.prisma.restaurant.findFirst({
      where: { id: data.restaurantId },
    });

    if (!bazaRetaran) {
      throw new BadRequestException('Wrong restaran ID');
    }

    const newUser = await this.prisma.user.create({
      data: {
        name: data.name,
        password: hashedPassword,
        role: 'ADMIN',
        restaurantId: data.restaurantId,
        regionId: data.regionId,
      },
    });
    return newUser;
  }

  async login(data: UpdateAuthDto) {
    if (!data.name || !data.password) {
      throw new BadRequestException(
        'Name and password are required for login!',
      );
    }

    const user = await this.findUser(data.name);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = bcrypt.compareSync(data.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password!');
    }

    const token = this.jwt.sign({
      id: user.id,
      role: user.role,
    });


    return { token };
  }

  async getUserData(req: Request) {
    return await this.prisma.user.findFirst({where: {id: req['user'].id}})
  }
}
