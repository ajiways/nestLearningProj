import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { TokenService } from '../token/token.service';
import { compare, hash } from 'bcrypt';
import { LoginResponseInterface } from './interfaces/login-response.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly authRepository: Repository<User>,
    private readonly tokenService: TokenService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponseInterface> {
    const candidate = await this.authRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!candidate) {
      throw new HttpException(
        'Wrong email or password',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const match = await compare(loginDto.password, candidate.password);

      if (match) {
        return {
          user: candidate,
          token: this.tokenService.generateToken(candidate),
        };
      } else {
        throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
      }
    }
  }

  async register(registerDto: RegisterDto) {
    const candidateEmail = await this.authRepository.findOne({
      where: { email: registerDto.email },
    });
    const candidatePhone = await this.authRepository.findOne({
      where: {
        phone: registerDto.phone,
      },
    });

    if (candidateEmail || candidatePhone) {
      throw new HttpException(
        'User with the provided email or phone already exists',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      registerDto.password = await hash(registerDto.password, 7);
      return await this.authRepository.create(registerDto).save();
    }
  }
}
