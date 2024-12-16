import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';
import { envValidator } from 'src/utils/validators/env.validator';
import { AlpacaConfig } from './config.type';

class EnvironmentVariables {
  @IsString()
  APCA_API_KEY_ID: string;

  @IsString()
  APCA_API_SECRET_KEY: string;
}

export default registerAs<AlpacaConfig>('alpaca', () => {
  envValidator(process.env, EnvironmentVariables);
  return {
    apiKey: process.env.APCA_API_KEY_ID,
    secretKey: process.env.APCA_API_SECRET_KEY,
  };
});
