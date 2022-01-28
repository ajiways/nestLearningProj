import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from './cart.entity';
import { RequestParamsIdGuard } from '../../guards/RequestParamsId.guard';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { CreateCartDto } from './dtos/create-cart.dto';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('carts')
export class CartController {
  constructor(private readonly cartsService: CartService) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async createCart(@Body() createCartDto: CreateCartDto) {
    return this.cartsService.create(createCartDto);
  }

  @Get()
  async getAllCarts(): Promise<Cart[]> {
    return this.cartsService.findAll();
  }

  @Get(':id')
  @UseGuards(RequestParamsIdGuard)
  async getCartById(@Param() params): Promise<Cart> {
    return this.cartsService.findOne(params.id);
  }
}
