import { Injectable } from '@nestjs/common';
import { userData } from './interfaces/userData.interface';
import { sign, verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(private readonly configService: ConfigService) {}

  generateToken(payload: userData): string {
    return sign({ payload }, this.configService.get('SECRET'));
  }

  validateToken(token: unknown): userData | null {
    try {
      return verify(
        String(token),
        this.configService.get('SECRET'),
      ) as userData;
    } catch (error) {
      return null;
    }
  }
}
