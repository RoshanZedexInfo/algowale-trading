import { registerAs } from '@nestjs/config';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { envValidator } from 'src/utils/validators/env.validator';
import { RedisConfig } from './config.type';

class EnvironmentVariables {
  @IsString()
  REDIS_HOST: string;

  @IsInt()
  REDIS_PORT: number;

  @IsString()
  @IsOptional()
  REDIS_USERNAME: string;

  @IsString()
  @IsOptional()
  REDIS_PASSWORD: string;
}

export default registerAs<RedisConfig>('redis', () => {
  envValidator(process.env, EnvironmentVariables);
  return {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    username: process.env.REDIS_USERNAME || '',
    password: process.env.REDIS_PASSWORD || '',
  };
});
