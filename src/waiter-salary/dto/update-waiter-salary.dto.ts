import { PartialType } from '@nestjs/mapped-types';
import { CreateWaiterSalaryDto } from './create-waiter-salary.dto';

export class UpdateWaiterSalaryDto extends PartialType(CreateWaiterSalaryDto) {}
