import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RequestParamsIdGuard } from '../../guards/RequestParamsId.guard';
import { BrandService } from './brand.service';
import { Brand } from './brand.entity';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  async getAllAttachments(): Promise<Brand[]> {
    return await this.brandService.findAll();
  }

  @Get(':id')
  @UseGuards(RequestParamsIdGuard)
  async getAttachmentById(@Param() params): Promise<Brand> {
    return await this.brandService.findOne(params.id);
  }
}
