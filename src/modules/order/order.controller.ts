import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { RequestParamsIdGuard } from '../../guards/RequestParamsId.guard';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @UseGuards(RequestParamsIdGuard)
  async getOrderById(@Param() params) {
    return this.orderService.findOne(params.id);
  }
}
