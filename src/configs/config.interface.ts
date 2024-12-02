enum AppEnv {
  Development = 'development',
  staging = 'staging',
  Production = 'production',
}
interface AppConfig {
  env: AppEnv;
  name: string;
  port: number;
}

interface DatabaseConfig {
  url: string;
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  maxConnections: number;
}

interface RedisConfig {
  host: string;
  port: number;
  username?: string;
  password?: string;
}

interface AlpacaConfig {
  apiKey: string;
  secretKey: string;
}

interface Config {
  app: AppConfig;
  database: DatabaseConfig;
  redis: RedisConfig;
  alpaca: AlpacaConfig;
}
