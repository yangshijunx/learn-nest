import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { utilities } from 'nest-winston';
import { createLogger } from 'winston';
import * as winston from 'winston';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston/dist/winston.module';
import 'winston-daily-rotate-file';

async function bootstrap() {
  // const logger = new Logger();
  const instance = createLogger({
    // winston日志配置
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp(),
          utilities.format.nestLike(),
        ),
      }),
      new winston.transports.DailyRotateFile({
        // 日志级别
        level: 'info',
        // 日志文件存放位置
        dirname: 'logs',
        filename: 'info-%DATE%.log',
        // 日志文件格式
        datePattern: 'YYYY-MM-DD-HH',
        // 压缩
        zippedArchive: true,
        // 最大容量
        maxSize: '20m',
        // 最大保存天数
        maxFiles: '14d',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.simple(),
        ),
      }),
      new winston.transports.DailyRotateFile({
        // 日志级别
        level: 'warn',
        // 日志文件存放位置
        dirname: 'logs',
        filename: 'warn-%DATE%.log',
        // 日志文件格式
        datePattern: 'YYYY-MM-DD-HH',
        // 压缩
        zippedArchive: true,
        // 最大容量
        maxSize: '20m',
        // 最大保存天数
        maxFiles: '14d',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.simple(),
        ),
      }),
      new winston.transports.DailyRotateFile({
        // 日志级别
        level: 'error',
        // 日志文件存放位置
        dirname: 'logs',
        filename: 'error-%DATE%.log',
        // 日志文件格式
        datePattern: 'YYYY-MM-DD-HH',
        // 压缩
        zippedArchive: true,
        // 最大容量
        maxSize: '20m',
        // 最大保存天数
        maxFiles: '14d',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.simple(),
        ),
      }),
    ],
  });
  const app = await NestFactory.create(
    AppModule,
    {
      cors: true,
      // logger: ['error', 'warn', 'log'],
      // 注册winston日志，然后在app.module.ts中使用
      logger: WinstonModule.createLogger({
        instance,
      }),
    },
    // {
    //   // 关闭整个nestjs日志
    // winston日志就不写了
    //   // logger: false,
    //   logger: ['error', 'warn', 'log'],
    // },
  );
  app.setGlobalPrefix('api/v1');
  const port = 3000;
  await app.listen(port);
  Logger.log(`APP运行在：${port}`);
}
bootstrap();
