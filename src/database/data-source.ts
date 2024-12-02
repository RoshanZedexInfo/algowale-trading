import {
  CLI_CONFIG,
  ENTITIES_DIRS,
  MIGRATION_TABLE_NAME,
  MIGRATIONS_DIRS,
} from 'src/constants/app.constant';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions = {
  type: process.env.DATABASE_TYPE,
  url: process.env.DATABASE_URL,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT
    ? parseInt(process.env.DATABASE_PORT, 10)
    : 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize:
    process.env.ENV !== 'production'
      ? process.env.DATABASE_SYNCHRONIZE === 'true'
      : false,
  dropSchema: false,
  logging: process.env.ENV !== 'production',
  entities: [ENTITIES_DIRS],
  migrations: [MIGRATIONS_DIRS],
  migrationsTableName: MIGRATION_TABLE_NAME,
  cli: CLI_CONFIG,
  extra: {
    max: process.env.DATABASE_MAX_CONNECTIONS
      ? parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10)
      : 100,
  },
} as DataSourceOptions;

export default new DataSource(dataSourceOptions);
