import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './property.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  async findAll() {
    return await this.propertyRepository.find();
  }

  async findOne(id: number) {
    const result = await this.propertyRepository.findOne({ where: { id: id } });

    if (!result) {
      throw new HttpException(
        'Cart with the provided id was not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }
}
