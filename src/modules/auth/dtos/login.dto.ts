import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'must be a string' })
  @IsEmail({}, { message: 'must be a correct email' })
  email: string;

  @IsString({ message: 'must be a string' })
  @Length(6, 16)
  password: string;
}
