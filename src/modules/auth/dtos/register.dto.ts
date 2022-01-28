import { IsEmail, IsPhoneNumber, IsString, Length } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @Length(6, 16)
  password: string;

  @IsPhoneNumber()
  phone: string;

  @IsString()
  @Length(2, 16)
  firstName: string;

  @IsString()
  @Length(3, 16)
  lastName: string;
}
