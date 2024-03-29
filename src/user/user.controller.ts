import { Controller, Get, Logger, LoggerService } from '@nestjs/common';
import {
  Body,
  Inject,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common/decorators';
import { get } from 'http';
import { Response, Request, response } from 'express';
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
  deleteUserById(@Query() request: Request): any {
    // console.log('请求入参', request);
    return this.UserService.deleteUserById(Number(request.query.id));
  }

  // 更新用户
  @Get('updateUserById')
  updateUserById(@Req() request: Request): any {
    console.log('请求入参', request);
    return this.UserService.updateUserById(Number(request.query.id));
  }

  // 查找用户关联profile
  @Get('getProfileByUserId')
  getProfileByUserId(@Req() request: Request): any {
    // console.log('请求入参', process.env);
    return this.UserService.getProfileByUserId(Number(request.query.id));
  }
  // 通过id查找用户
  @Get('getUserById')
  getUserById(@Query() request: any): any {
    console.log('通过id请求入参', request);
    let { id } = request;
    try {
      id = Number(id);
    } catch (error) {
      console.log('error', error);
    }
    return this.UserService.getUserById(id);
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
  // post登录接口
  @Post('login')
  async login(@Body() request: any, @Res() response: Response): Promise<any> {
    // console.log('登录入参', response);
    const { username, password } = request;
    // console.log('登录入参', request, username, password);
    if (!username || !password) {
      response
        .status(401)
        .send({
          status: 401,
          message: '登录失败',
          data: null,
        })
        .end();
    }
    // 如果可以查到用户就返回用户信息，状态码200，如果查不到就返回null，状态码401
    const res = await this.UserService.login(
      username as string,
      password as string,
    );
    console.log('登录结果', res);
    if (res) {
      response
        .status(200)
        .send({
          status: 200,
          message: '登录成功',
          data: res,
        })
        .end();
    } else {
      response
        .status(401)
        .send({
          status: 401,
          message: '登录失败',
          data: null,
        })
        .end();
    }
  }
}
