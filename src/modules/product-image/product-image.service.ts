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
    const result = await this.productImageRepository.find();

    if (result.length === 0) {
      throw new HttpException('Nothing was found', HttpStatus.NOT_FOUND);
    }

    return result;
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
