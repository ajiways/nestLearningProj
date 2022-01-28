import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RequestParamsIdGuard } from '../../guards/RequestParamsId.guard';
import { ProductImageService } from './product-image.service';

@Controller('product-images')
export class ProductImageController {
  constructor(private readonly productImageService: ProductImageService) {}

  @Get()
  async getAllProductImages() {
    return this.productImageService.findAll();
  }

  @Get(':id')
  @UseGuards(RequestParamsIdGuard)
  async getProductImageById(@Param() params) {
    return this.productImageService.findOne(params.id);
  }
}
