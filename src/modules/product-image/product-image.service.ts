import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImage } from './product-image.entity';

@Injectable()
export class ProductImageService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
  ) {}

  async findAll() {
    return await this.productImageRepository.find();
  }

  async findOne(id: number) {
    const result = await this.productImageRepository.findOne({
      where: { id: id },
    });

    if (!result) {
      throw new HttpException(
        'Cart with the provided id was not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }
}
