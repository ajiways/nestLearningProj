import { Injectable } from '@nestjs/common';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dtos/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findAll() {
    return await this.orderRepository.find();
  }

  async findOne(id: number) {
    return await this.orderRepository.findOne({ where: { id: id } });
  }

  async create(createOrderDto: CreateOrderDto) {
    return await this.orderRepository.create(createOrderDto).save();
  }
}
