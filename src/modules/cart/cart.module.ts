import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { Product } from '../product/product.entity';
import { Order } from '../order/order.entity';
import { ProductService } from '../product/product.service';
import { OrderService } from '../order/order.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Product, Order, User])],
  providers: [
    CartService,
    ProductService,
    OrderService,
    UserService,
    TokenService,
  ],
  controllers: [CartController],
})
export class CartModule {}
