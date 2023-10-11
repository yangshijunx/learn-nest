import { Injectable, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLogs } from 'src/logs/logs.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserLogs)
    private readonly userLogsRepository: Repository<UserLogs>,
  ) {}
  // 获取用户权限
  getAuthButtonList(request: Request, response: Response): any {
    response.status(200).send({
      code: 200,
      data: {
        useProTable: ['add', 'batchAdd', 'export', 'batchDelete', 'status'],
        authButton: ['add', 'edit', 'delete', 'import', 'export'],
      },
      message: 'success',
    });
  }
}
