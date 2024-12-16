import { User } from 'src/users/entities/user.entity';

export type LoginResponseType = {
  token: string;
  refreshToken: string;
  expiresIn: number;
  user: User;
};
