import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class RequestParamsIdGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (isNaN(request.params.id) || request.params.id <= 0) {
      throw new HttpException(
        'Wrong parameters in request',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return true;
    }
  }
}
