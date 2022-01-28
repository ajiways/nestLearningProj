import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RequestParamsIdGuard } from '../../guards/RequestParamsId.guard';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  async getAllPayments() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  @UseGuards(RequestParamsIdGuard)
  async getPaymentById(@Param() params) {
    return this.paymentService.findOne(params.id);
  }
}
