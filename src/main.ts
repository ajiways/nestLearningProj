import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { getConnection } from 'typeorm';
config();

async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  await app.listen(configService.get('PORT'));
  const connection = await getConnection();
  await connection.runMigrations();
}
bootstrap();
