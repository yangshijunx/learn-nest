import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLogs } from 'src/logs/logs.entity';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  // 使用模型要加上去
  // 该模块使用forFeature()方法来定义应在当前范围中注册的存储库
  imports: [TypeOrmModule.forFeature([User, UserLogs])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
