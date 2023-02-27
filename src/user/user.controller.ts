import { Controller, Get } from '@nestjs/common';
import { get } from 'http';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {
    // 这里是语法糖等同于this.UserService = new UserService
  }
  // 这里写路由
  @Get('')
  getUser(): any {
    return this.UserService.getUser();
  }
}
