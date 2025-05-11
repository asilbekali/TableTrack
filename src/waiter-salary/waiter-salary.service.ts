import { Injectable } from '@nestjs/common';
import { CreateWaiterSalaryDto } from './dto/create-waiter-salary.dto';
import { UpdateWaiterSalaryDto } from './dto/update-waiter-salary.dto';

@Injectable()
export class WaiterSalaryService {
  create(createWaiterSalaryDto: CreateWaiterSalaryDto) {
    return 'This action adds a new waiterSalary';
  }

  findAll() {
    return `This action returns all waiterSalary`;
  }

  findOne(id: number) {
    return `This action returns a #${id} waiterSalary`;
  }

  update(id: number, updateWaiterSalaryDto: UpdateWaiterSalaryDto) {
    return `This action updates a #${id} waiterSalary`;
  }

  remove(id: number) {
    return `This action removes a #${id} waiterSalary`;
  }
}
