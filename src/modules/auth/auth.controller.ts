import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { Request } from 'express';
import { TokenService } from '../token/token.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(
    @Body() loginDto: LoginDto,
    @Req() request,
    @Res({ passthrough: true }) response,
  ) {
    if (request.cookies.token) {
      const decodedData = this.tokenService.validateToken(
        request.cookies.token,
      );

      if (decodedData) {
        throw new HttpException('Already logged in!', HttpStatus.BAD_REQUEST);
      }
    }

    const res = await this.authService.login(loginDto);

    response.cookie('token', res.token);

    return { message: 'Welcome back!' };
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @Get('logout')
  async logout(@Req() request: Request, @Res({ passthrough: true }) response) {
    const token = request.cookies.token;

    if (!token) {
      throw new HttpException(
        'To log out, log in first',
        HttpStatus.BAD_REQUEST,
      );
    }

    response.clearCookie('token');
    response.status(200);
    return { message: 'Successfully logged out!' };
  }
}
