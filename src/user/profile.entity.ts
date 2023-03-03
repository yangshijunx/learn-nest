import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gender: string;

  @Column()
  photo: string;

  @Column()
  address: string;

  // onetoone 函数是因为，类似于按需加载
  @OneToOne(() => User)
  // joinColumn 用于指定外键的名称
  @JoinColumn({ name: 'user_id' })
  user: User;
}
