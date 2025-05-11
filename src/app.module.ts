import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { DebtModule } from './debt/debt.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { RegionModule } from './region/region.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { UserModule } from './user/user.module';
import { WaiterSalaryModule } from './waiter-salary/waiter-salary.module';
import { WithdrawModule } from './withdraw/withdraw.module';
import { PrismaModule } from './prisma/prisma.module';
import { OrderItemsModule } from './order-items/order-items.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    AuthModule,
    CategoryModule,
    DebtModule,
    OrderModule,
    ProductModule,
    RegionModule,
    RestaurantModule,
    UserModule,
    WaiterSalaryModule,
    WithdrawModule,
    PrismaModule,
    OrderItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
