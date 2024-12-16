import { registerAs } from '@nestjs/config';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { envValidator } from 'src/utils/validators/env.validator';
import { AppConfig, Environment } from './config.type';
class EnvironmentVariables {
  @IsEnum(Environment)
  @IsOptional()
  APP_ENV: Environment;

  @IsString()
  @IsOptional()
  APP_NAME: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  APP_PORT: number;
}

export default registerAs<AppConfig>('app', () => {
  envValidator(process.env, EnvironmentVariables);
  return {
    env: (process.env.APP_ENV as Environment) || ('development' as Environment),
    name: process.env.APP_NAME || 'NestJS App',
    port: parseInt(process.env.APP_PORT, 10) || 3000,
  };
});
