import { registerAs } from '@nestjs/config';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';
import { envValidator } from 'src/utils/validators/env.validator';

class EnvironmentVariables {
  @ValidateIf((values) => values.DATABASE_URL)
  @IsString()
  DATABASE_URL: string;

  @ValidateIf((values) => !values.DATABASE_URL)
  @IsString()
  DATABASE_TYPE: string;

  @ValidateIf((values) => !values.DATABASE_URL)
  @IsString()
  DATABASE_HOST: string;

  @ValidateIf((values) => !values.DATABASE_URL)
  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  DATABASE_PORT: number;

  @ValidateIf((values) => !values.DATABASE_URL)
  @IsString()
  @IsOptional()
  DATABASE_NAME: string;

  @ValidateIf((values) => !values.DATABASE_URL)
  @IsString()
  DATABASE_USERNAME: string;

  @ValidateIf((values) => !values.DATABASE_URL)
  @IsString()
  DATABASE_PASSWORD: string;

  @IsBoolean()
  @IsOptional()
  DATABASE_SYNCHRONIZE: boolean;

  @IsInt()
  @IsOptional()
  DATABASE_MAX_CONNECTIONS: number;
}

export default registerAs<DatabaseConfig>('database', () => {
  envValidator(process.env, EnvironmentVariables);
  return {
    url: process.env.DATABASE_URL,
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize:
      process.env.ENV !== 'production'
        ? process.env.DATABASE_SYNCHRONIZE === 'true'
        : false,
    maxConnections: parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10) || 100,
  };
});
