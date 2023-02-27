import { Injectable } from '@nestjs/common';

// service主要是逻辑部分
@Injectable()
export class UserService {
  getUser() {
    return {
      code: 200,
      mag: 'success',
    };
  }
}
