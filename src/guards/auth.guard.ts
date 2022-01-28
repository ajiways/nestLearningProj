import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TokenService } from '../modules/token/token.service';
import { User } from '../modules/user/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.cookies.token;
    const decodedData = this.tokenService.validateToken(token);

    if (!token || !decodedData) {
      throw new HttpException('User is unauthorized', HttpStatus.FORBIDDEN);
    }

    const user = await User.findOne({
      where: { email: decodedData.payload.email },
    });

    if (!user) {
      throw new HttpException('User is unauthorized', HttpStatus.FORBIDDEN);
    }

    request.user = user;

    return true;
  }
}
