import { Module } from '@nestjs/common';
import { WaiterSalaryService } from './waiter-salary.service';
import { WaiterSalaryController } from './waiter-salary.controller';

@Module({
  controllers: [WaiterSalaryController],
  providers: [WaiterSalaryService],
})
export class WaiterSalaryModule {}
