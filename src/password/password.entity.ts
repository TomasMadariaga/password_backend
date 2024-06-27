import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Password {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password: string;

  @Column()
  account: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.password, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'userId' })
  public user: User;
}
