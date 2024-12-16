import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';
import { envValidator } from 'src/utils/validators/env.validator';
import { AuthCofig } from './config.type';

class EnvironmentVariables {
  @IsString()
  JWT_SECRET: string;

  @IsString()
  JWT_EXPIRES: string;

  @IsString()
  REFRESH_SECRET: string;

  @IsString()
  REFRESH_EXPIRES: string;
}

export default registerAs<AuthCofig>('auth', () => {
  envValidator(process.env, EnvironmentVariables);
  return {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpires: process.env.JWT_EXPIRES,
    refreshSecret: process.env.REFRESH_SECRET,
    refreshExpires: process.env.REFRESH_EXPIRES,
  };
});
