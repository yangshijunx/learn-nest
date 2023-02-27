import { Controller, Get } from '@nestjs/common';
import { Req, Res, HttpCode, Header } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { Console } from 'console';
import { Response, Request, response } from 'express';
import { request } from 'http';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('nihao')
  getNihao(): string {
    return this.appService.getNihao();
  }
  @Get('getReq')
  getReq(@Req() request: Request, @Res() response: Response): any {
    console.log(request.query, request.params, request.ip, request.hostname);
    // return 'This action returns all cats';
    // 通过获取到ts的类型，我想你应该理解这个对象的意义，如果你调用了
    // Req和Res那么这个时候你就需要手动的res.sed(),不推荐 如果你直接
    // 这样做，将会导致失去与Nest标准相应处理的Nest功能（例如拦截器（Interceptors）和
    // @HttpCode()/@Header() 装饰器的兼容性 ）
    // 要解决这个问题，可以将passthrough选项设置为true比如下面的函数"/getReq2"
    // 这样就能兼容，你只定义了code其他的定义依然交给nest处理
    // HttpStatus.OK是一个枚举值
    response.status(HttpStatus.OK).send();
  }
  @Get('testCode')
  @HttpCode(210)
  @Header('Cache-Control', 'none')
  testCode(): any {
    return {
      message: 'testcode',
    };
  }
}
