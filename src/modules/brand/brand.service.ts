import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async findAll() {
    const result = await this.brandRepository.find();

    if (result.length === 0) {
      throw new HttpException('Nothing was found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async findOne(id: number) {
    const result = await this.brandRepository.findOne({ where: { id } });

    if (!result) {
      throw new HttpException(
        'Attachment with the provided id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }
}
