import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import {
  CLI_CONFIG,
  ENTITIES_DIRS,
  MIGRATION_TABLE_NAME,
  MIGRATIONS_DIRS,
} from 'src/constants/app.constant';

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService<Config>) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get('database.type', { infer: true }),
      url: this.configService.get('database.url', { infer: true }),
      host: this.configService.get('database.host', { infer: true }),
      port: this.configService.get('database.port', { infer: true }),
      username: this.configService.get('database.username', { infer: true }),
      password: this.configService.get('database.password', {
        infer: true,
      }),
      database: this.configService.get('database.database', { infer: true }),
      synchronize: this.configService.get('database.synchronize', {
        infer: true,
      }),
      dropSchema: false,
      logging:
        this.configService.get('app.env', { infer: true }) !== 'production',
      entities: [ENTITIES_DIRS],
      migrations: [MIGRATIONS_DIRS],
      migrationsTableName: MIGRATION_TABLE_NAME,
      cli: CLI_CONFIG,
      extra: {
        max: this.configService.get('database.maxConnections', {
          infer: true,
        }),
      },
    } as TypeOrmModuleOptions;
  }
}
