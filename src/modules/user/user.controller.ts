import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  async getAllUsers() {
    return await this.userService.findAll();
  }

  async getUserById(id: number) {
    return await this.userService.findOne(id);
  }
}
