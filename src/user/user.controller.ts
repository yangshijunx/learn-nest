import { Controller, Get, Logger, LoggerService } from '@nestjs/common';
import { Inject, Post, Req } from '@nestjs/common/decorators';
import { get } from 'http';
import { Response, Request } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  // private logger = new Logger(UserController.name);

  constructor(
    private UserService: UserService,
    // 没有全局注册之前的写法
    // @Inject(Logger) private readonly logger: LoggerService,
    // 全局注册之后的写法
    private readonly logger: Logger,
  ) {
    // 这里是语法糖等同于this.UserService = new UserService
    // shell 打印日志
    this.logger.log('UserController init');
  }
  // 这里写路由
  @Get('all')
  getUser(): any {
    this.logger.log('获取用户信息成功');
    this.logger.error('获取用户信息失败');
    this.logger.warn('获取用户信息警告');
    this.logger.debug('获取用户信息调试');
    this.logger.verbose('获取用户信息详细');
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
    // console.log('请求入参', process.env);
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
