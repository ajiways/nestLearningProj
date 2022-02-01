import { IsEnum, Min } from 'class-validator';
import { orderStatus } from '../order.entity';

export class CreateOrderDto {
  @Min(0)
  customerId: number;

  @IsEnum(orderStatus)
  status: orderStatus.REGISTRATION;
}
