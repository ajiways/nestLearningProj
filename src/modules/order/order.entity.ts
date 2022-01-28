import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

export enum orderStatus {
  PREPARING = 'PREPARING',
  REGISTRATION = 'REGISTRATION',
  PAYING = 'PAYING',
}

@Entity('orders')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  customer!: User;

  @Column({
    type: 'enum',
    enum: orderStatus,
    default: orderStatus.REGISTRATION,
  })
  status!: orderStatus;

  @CreateDateColumn()
  createdAt!: number;

  @UpdateDateColumn()
  updatedAt!: number;
}
