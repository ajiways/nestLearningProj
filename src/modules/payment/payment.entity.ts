import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../order/order.entity';

@Entity('payments')
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Order)
  @JoinColumn()
  order!: number;

  @Column({
    length: 56,
  })
  kind!: string;
}
