import { Controller, Get } from '@nestjs/common';
import { Post, Req } from '@nestjs/common/decorators';
import { get } from 'http';
import { Response, Request } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {
    // 这里是语法糖等同于this.UserService = new UserService
  }
  // 这里写路由
  @Get('all')
  getUser(): any {
    return this.UserService.findAll();
  }

  @Get('getUserByName')
  getUserByName(@Req() request: Request): any {
    // console.log('请求入参', request);
    return this.UserService.findUserByName(request.query.username as string);
  }

  // 删除用户
  @Post('deleteUserById')
  deleteUserById(@Req() request: Request): any {
    // console.log('请求入参', request);
    return this.UserService.deleteUserById(Number(request.query.id));
  }

  // 更新用户
  @Get('updateUserById')
  updateUserById(@Req() request: Request): any {
    // console.log('请求入参', request);
    return this.UserService.updateUserById(Number(request.query.id));
  }

  // 查找用户关联profile
  @Get('getProfileByUserId')
  getProfileByUserId(@Req() request: Request): any {
    console.log('请求入参', process.env);
    return this.UserService.getProfileByUserId(Number(request.query.id));
  }

  // 查找用户关联profile
  @Get('findUserLogsByGroup')
  async findUserLogsByGroup(@Req() request: Request): Promise<any> {
    // return this.UserService.findUserLogsByGroup(Number(request.query.id));
    // 我们可以在这里对查询的数据再次进行处理保证用户只拿到我们希望他们拿到的数据
    const res = await this.UserService.findUserLogsByGroup(
      Number(request.query.id),
    );
    return res.map((item) => ({
      result: item.result,
      count: item.count,
    }));
  }
}
