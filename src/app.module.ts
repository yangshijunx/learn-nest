import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import * as Joi from 'joi';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        DATA_BASE: Joi.number().valid(3307, 3308),
      }),
    }),
  ],
  // 我们在app.module导入之后，在app.module的controllers和providers中都是可以使用的
  // 设置isGlobal: true, 否则都需要在使用的module下面导入，使用
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
