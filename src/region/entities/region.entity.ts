import { Region as PrismaRegion } from '@prisma/client';

export class RegionEntity implements PrismaRegion {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
