import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { CreateCartDto } from './dtos/create-cart.dto';
import { OrderService } from '../order/order.service';
import { ProductService } from '../product/product.service';
import { CreateOrderDto } from '../order/dtos/create-order.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    private readonly orderService: OrderService,
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}

  async create(createCartDto: CreateCartDto) {
    const product = await this.productService.findOne(createCartDto.productId);
    const customer = await this.userService.findOne(createCartDto.customerId);
    const createOrderDto = new CreateOrderDto();

    createOrderDto.customerId = createCartDto.customerId;

    const order = await this.orderService.create(createOrderDto);

    if (!order) {
      throw new HttpException(
        'Order not found (server error)',
        HttpStatus.NOT_FOUND,
      );
    } else if (!product) {
      await order.remove();

      throw new HttpException(
        'Product with the provided id was not found',
        HttpStatus.NOT_FOUND,
      );
    } else if (!customer) {
      await order.remove();

      throw new HttpException(
        'Customer with the provided id was not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.cartRepository
      .create({
        order,
        product,
        amount: createCartDto.amount,
      })
      .save();
  }

  async findAll() {
    const result = await this.cartRepository.find();

    if (result.length === 0) {
      throw new HttpException('Nothing was found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async findOne(id: number) {
    const result = await this.cartRepository.findOne(id);

    if (!result) {
      throw new HttpException(
        'Cart with the provided id was not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }
}
