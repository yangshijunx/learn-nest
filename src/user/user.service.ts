import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLogs } from 'src/logs/logs.entity';
import { Repository } from 'typeorm';
import { User } from './user.entity';

// service主要是逻辑部分
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserLogs)
    private readonly userLogsRepository: Repository<UserLogs>,
  ) {}
  findAll() {
    return this.userRepository.find();
  }
  findUserByName(userName: string) {
    return this.userRepository.find({
      // 键名和键值一样只用写一个这里我用了驼峰和数据库的不一样
      where: { username: userName },
    });
  }
  deleteUserById(id: number) {
    return this.userRepository.delete(id);
  }
  updateUserById(id: number) {
    const user = { username: 'newName' } as User;
    return this.userRepository.update(id, user);
  }
  // 获取用户关联的profile
  getProfileByUserId(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
      // 不设置relation就不会有关联数据
      relations: {
        // 这里会报错是因为我们建立关系的时候只在profile模型中添加了
        // oneToone进行关联，user模型并不知道所以要加一下，不加的话也不会有代码提示
        userprofile: true,
      },
    });
  }
  // 聚合查询,将查询数据进行聚合
  findUserLogsByGroup(id: number) {
    // 可以直接使用sql语句，if you want
    // this.userLogsRepository.query(" SELECT * FROM user_log ")
    return (
      this.userLogsRepository
        .createQueryBuilder('user_logs')
        // 查询result
        .select('user_logs.result', 'result')
        // 计算用户一共有几条log，第二个参数count就是别名前端看见的
        .addSelect('COUNT("user_logs.result")', 'count')
        // 这里就是在查询关联的用户数据user
        .leftJoinAndSelect('user_logs.user', 'user')
        // 不能拼接字符串防止sql注入，这里的user对应上面已经查询到的 user
        .where('user.id = :id', { id })
        // 这里的groupBy就是按照你指定的数据库中的字段名进行分组
        .groupBy('user_logs.result')
        // 这里的第一个参数count需要和上面设置的别名一致
        .orderBy('count', 'DESC')
        // 但是不能单独使用offset，必须结合limit是用，分页相当好用
        // ps 从零开始
        .offset(0)
        // 可以单独限制limit限制查询条数
        .limit(10)
        .getRawMany()
    );
  }
}
