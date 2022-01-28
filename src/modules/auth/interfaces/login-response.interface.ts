import { User } from '../../user/user.entity';

export interface LoginResponseInterface {
  user: User;
  token: string;
}
