import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttachmentModule } from './modules/attachment/attachment.module';
import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { TokenModule } from './modules/token/token.module';
import { BrandModule } from './modules/brand/brand.module';
import { CartModule } from './modules/cart/cart.module';
import { CategoryModule } from './modules/category/category.module';
import { CurrencyModule } from './modules/currency/currency.module';
import { OrderModule } from './modules/order/order.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ProductModule } from './modules/product/product.module';
import { ProductImageModule } from './modules/product-image/product-image.module';
import { PropertyModule } from './modules/property/property.module';
import { typeOrmConfigAsync } from './config/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AttachmentModule,
    AuthModule,
    TokenModule,
    BrandModule,
    CartModule,
    CategoryModule,
    CurrencyModule,
    OrderModule,
    PaymentModule,
    ProductModule,
    ProductImageModule,
    PropertyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
