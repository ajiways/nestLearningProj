import { orderStatus } from '../order.entity';

export class CreateOrderDto {
  customerId: number;
  status: orderStatus.REGISTRATION;
}
