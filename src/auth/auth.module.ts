import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserLogs } from 'src/logs/logs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserLogs])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
