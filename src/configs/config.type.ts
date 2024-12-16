export enum Environment {
  Development = 'development',
  staging = 'staging',
  Production = 'production',
}

export type AppConfig = {
  env: Environment;
  name: string;
  port: number;
};

export type AuthCofig = {
  jwtSecret: string;
  jwtExpires: string;
  refreshSecret: string;
  refreshExpires: string;
};

export type DatabaseConfig = {
  url: string;
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  maxConnections: number;
};

export type RedisConfig = {
  host: string;
  port: number;
  username?: string;
  password?: string;
};

export type AlpacaConfig = {
  apiKey: string;
  secretKey: string;
};

export type Config = {
  app: AppConfig;
  auth: AuthCofig;
  database: DatabaseConfig;
  redis: RedisConfig;
  alpaca: AlpacaConfig;
};
