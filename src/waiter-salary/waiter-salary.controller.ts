import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WaiterSalaryService } from './waiter-salary.service';
import { CreateWaiterSalaryDto } from './dto/create-waiter-salary.dto';
import { UpdateWaiterSalaryDto } from './dto/update-waiter-salary.dto';

@Controller('waiter-salary')
export class WaiterSalaryController {
  constructor(private readonly waiterSalaryService: WaiterSalaryService) {}

  @Post()
  create(@Body() createWaiterSalaryDto: CreateWaiterSalaryDto) {
    return this.waiterSalaryService.create(createWaiterSalaryDto);
  }

  @Get()
  findAll() {
    return this.waiterSalaryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.waiterSalaryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWaiterSalaryDto: UpdateWaiterSalaryDto) {
    return this.waiterSalaryService.update(+id, updateWaiterSalaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.waiterSalaryService.remove(+id);
  }
}
