import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency } from './currency.entity';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(Currency)
    private readonly currencyRepository: Repository<Currency>,
  ) {}

  async findAll() {
    return await this.currencyRepository.find();
  }

  async findOne(id: number) {
    const result = await this.currencyRepository.findOne({ where: { id: id } });

    if (!result) {
      throw new HttpException(
        'Cart with the provided id was not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }
}
