import { Order } from '@prisma/client';

export class OrderEntity implements Order {
  id: number;
  table: string;
  status: 'PENDING' | 'DEBTED' | 'PAYED';
  restaurantId: number;
  waiterId: number;
  createdAt: Date;
  updatedAt: Date;
}
