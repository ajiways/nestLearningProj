import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Brand } from '../brand/brand.entity';
import { Category } from '../category/category.entity';
import { Currency } from '../currency/currency.entity';
import { Property } from '../property/property.entity';

@Entity('products')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 56,
  })
  caption!: string;

  @ManyToOne(() => Category)
  @JoinTable()
  category!: Category;

  @Column()
  description!: string;

  @Column()
  price!: number;

  @ManyToOne(() => Currency)
  @JoinColumn()
  currency!: Currency;

  @ManyToOne(() => Brand)
  @JoinColumn()
  brand!: Brand;

  @Column({ nullable: true })
  availableAmount!: number;

  @ManyToMany(() => Property)
  @JoinTable({
    name: 'product_properties',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'property_id',
      referencedColumnName: 'id',
    },
  })
  property: Property;
}
