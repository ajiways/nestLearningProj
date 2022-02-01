import { Min } from 'class-validator';

export class CreateCartDto {
  @Min(1)
  customerId: number;

  @Min(1)
  productId: number;

  @Min(1)
  amount: number;
}
