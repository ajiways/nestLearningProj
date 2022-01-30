import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RequestParamsIdGuard } from '../../guards/RequestParamsId.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(RequestParamsIdGuard)
  async getUserById(@Param() params) {
    return await this.userService.findOne(params.id);
  }
}
