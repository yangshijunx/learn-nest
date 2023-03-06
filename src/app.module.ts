import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import * as Joi from 'joi';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigEnum } from './enum/config.enum';
import { User } from './user/user.entity';
import { UserProfile } from './user/profile.entity';
import { UserLogs } from './logs/logs.entity';
import { Roles } from './roles/roles.entity';
import { LoggerModule } from 'nestjs-pino';
import { join } from 'path';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        DB_TYPE: Joi.string().default('mysql'),
        DB_HOST: Joi.string().ip(),
        DB_PORT: Joi.number().default(3306),
        DB_USERNAME: Joi.string(),
        DB_PASSWORD: Joi.string(),
        DB_NAME: Joi.string(),
        DB_SYNC: Joi.boolean().default(false),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log('环境变量', configService.get(ConfigEnum.DB_SYNC));
        return {
          type: configService.get(ConfigEnum.DB_TYPE),
          host: configService.get(ConfigEnum.DB_HOST),
          port: configService.get(ConfigEnum.DB_PORT),
          username: configService.get(ConfigEnum.DB_USERNAME),
          password: configService.get(ConfigEnum.DB_PASSWORD),
          database: configService.get(ConfigEnum.DB_NAME),
          entities: [User, UserProfile, UserLogs, Roles],
          // 同步本地的schema到数据库 -> 初始化的时候会去使用
          synchronize: true,
          // logging：true会打印所有转换的sql语句
          logging: ['error', 'log', 'warn'],
          // logging: process.env.NODE_ENV === 'development',
          // 不然这里 useFactory 会报错上面要对配置进行校验
          // 参考https://github.com/nestjs/nest/issues/1119
        } as TypeOrmModuleOptions;
      },
    }),
    // 使用 pino 打印日志
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          targets: [
            process.env.NODE_ENV === 'development'
              ? {
                  level: 'info',
                  target: 'pino-pretty',
                  options: {
                    colorize: true,
                  },
                }
              : // 生产环境直接存起来就可以了
                {
                  level: 'info',
                  target: 'pino-roll',
                  options: {
                    file: join('logs', 'log.txt'),
                    // 日志滚动时间
                    frequency: 'daily', // hourly
                    // 单个日志文件大小
                    size: '10m',
                    mkdir: true,
                  },
                },
          ],
        },
      },
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'root',
    //   database: 'testapi',
    //   entities: [],
    //   // 同步本地的schema到数据库 -> 初始化的时候会去使用
    //   synchronize: true,
    //   logging: ['error'],
    // }),
  ],
  // 我们在app.module导入之后，在app.module的controllers和providers中都是可以使用的
  // 设置isGlobal: true, 否则都需要在使用的module下面导入，使用
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
