import { IsNumber, Min } from 'class-validator';

export class CreateCartDto {
  @IsNumber({ allowNaN: false })
  @Min(1)
  customerId: number;

  @IsNumber({ allowNaN: false })
  @Min(1)
  productId: number;

  @IsNumber({ allowNaN: false })
  @Min(1)
  amount: number;
}
