import { Restaurant } from '@prisma/client';

export class RestaurantEntity implements Restaurant {
  id: number;
  name: string;
  address: string;
  phone: string;
  tip: number;
  inActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
