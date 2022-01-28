import { Injectable } from '@nestjs/common';
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
    return await this.productImageRepository.findOne({ where: { id: id } });
  }
}
