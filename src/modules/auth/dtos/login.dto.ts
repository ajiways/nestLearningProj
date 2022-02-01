import { IsEmail, Length } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'must be a correct email' })
  email: string;

  @Length(6, 16)
  password: string;
}
