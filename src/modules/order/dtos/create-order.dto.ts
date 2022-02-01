import { Type } from 'class-transformer';
import { IsEnum, Min } from 'class-validator';
import { orderStatus } from '../order.entity';

export class CreateOrderDto {
  @Type(() => Number)
  @Min(1)
  customerId: number;

  @IsEnum(orderStatus)
  status: orderStatus.REGISTRATION;
}
