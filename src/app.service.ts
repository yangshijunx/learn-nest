import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    // const user = { admin: true };
    // if (user.admin) {
    //   throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // }
    // return 'Hello World!';
    return {
      message: 'Hello World!',
      code: 200,
      // img: 'http://127.0.0.1:8082/1.jpg',
      img: 'http://127.0.0.1:8082/2.pdf',
    };
  }
  getNihao(): string {
    return '你好吗？';
  }
  testData(): any {
    return {
      data: {
        dimensions: ['name', 'value'],
        source: [
          { name: '厦门', value: 90 },
          { name: '南阳', value: 50 },
          { name: '北京', value: 50 },
          { name: '上海', value: 100 },
          { name: '新疆', value: 100 },
          { name: '厦门', value: 90 },
          { name: '南阳', value: 50 },
          { name: '北京', value: 50 },
        ],
      },
    };
  }
}
