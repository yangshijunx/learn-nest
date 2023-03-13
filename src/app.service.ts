import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
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
