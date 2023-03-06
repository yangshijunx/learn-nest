import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule, {
    // 关闭整个nestjs日志
    // logger: false,
    logger: ['error', 'warn', 'log'],
  });
  app.setGlobalPrefix('api/v1');
  const port = 3000;
  await app.listen(port);
  logger.log(`APP运行在：${port}`);
}
bootstrap();
