import { Controller, Get, Param, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { CurrencyService } from './currency.service';

@Controller('currencies')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get()
  getAllCurrencies() {
    return this.currencyService.findAll();
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  getCurrencyById(@Param() params) {
    return this.currencyService.findOne(params.id);
  }
}
