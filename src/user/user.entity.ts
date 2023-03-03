import { UserLogs } from 'src/logs/logs.entity';
import { Roles } from 'src/roles/roles.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  // 到目前位置我们说的都是基于一个新的项目新增一个干干净净的数据库
  // 如果是旧的项目呢?我们需要使用一个npm的工具 typeorm - model - generator;
  // 其可以支持多种数据库的模型生成详见此项目上一级 model项目
  // 一个用户对应多个日志，第二个参数我的理解是为了ts识别属性
  @OneToMany(() => UserLogs, (userlogs) => userlogs.user)
  userlogs: UserLogs[];

  @ManyToMany(() => Roles, (role) => role.users)
  // 多对多需要一个中间表 jointables
  @JoinTable({ name: 'user_roles' })
  roles: Roles[];
}
