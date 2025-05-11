import { Product } from '@prisma/client';

export class ProductEntity implements Product {
  id: number;
  name: string;
  price: number;
  inActive: boolean;
  categoryId: number;
  restaurantId: number;
  createdAt: Date;
  updatedAt: Date;
}
