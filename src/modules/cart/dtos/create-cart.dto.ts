import { Type } from 'class-transformer';
import { Min } from 'class-validator';

export class CreateCartDto {
  @Type(() => Number)
  @Min(1)
  customerId: number;

  @Type(() => Number)
  @Min(1)
  productId: number;

  @Type(() => Number)
  @Min(1)
  amount: number;
}
