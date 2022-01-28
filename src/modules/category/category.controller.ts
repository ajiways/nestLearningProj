import { Controller, Get, Param, UsePipes } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ValidationPipe } from '../../pipes/validation.pipe';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAllCategories() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  getCategoryById(@Param() params) {
    return this.categoryService.findOne(params.id);
  }
}
