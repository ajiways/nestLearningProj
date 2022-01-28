import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { RequestParamsIdGuard } from '../../guards/RequestParamsId.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts() {
    return await this.productService.findAll();
  }

  @Get(':id')
  @UseGuards(RequestParamsIdGuard)
  async getProductById(@Param() params) {
    return await this.productService.findOne(params.id);
  }
}
