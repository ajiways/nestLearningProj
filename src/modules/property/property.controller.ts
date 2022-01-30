import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RequestParamsIdGuard } from '../../guards/RequestParamsId.guard';
import { PropertyService } from './property.service';

@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  async getAllProperties() {
    return this.propertyService.findAll();
  }

  @Get(':id')
  @UseGuards(RequestParamsIdGuard)
  async getPropertyImageById(@Param() params) {
    return this.propertyService.findOne(params.id);
  }
}
