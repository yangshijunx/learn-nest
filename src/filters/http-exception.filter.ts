import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  LoggerService,
} from '@nestjs/common';

export class HttpExceptionFilter implements ExceptionFilter {
  // 添加日志
  constructor(private logger: LoggerService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    // 获取请求上下文
    const ctx = host.switchToHttp();
    // 获取请求对象
    const request = ctx.getRequest();
    // 获取响应对象
    const response = ctx.getResponse();
    // 获取状态码
    const status = exception.getStatus();
    this.logger.error(exception.message, exception.stack);
    response.status(status).json({
      code: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
      method: request.method,
    });
  }
}
// 然后回到main.ts中进行全局使用该过滤器
