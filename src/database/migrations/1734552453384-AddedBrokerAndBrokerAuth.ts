import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedBrokerAndBrokerAuth1734552453384
  implements MigrationInterface
{
  name = 'AddedBrokerAndBrokerAuth1734552453384';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "brokers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f2193c20365b3efe26a39e6dabc" UNIQUE ("slug"), CONSTRAINT "PK_b8ee0411488131f6f9d322dbe7a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "broker_auths" ("id" SERIAL NOT NULL, "clientCode" character varying NOT NULL, "password" character varying NOT NULL, "totp" character varying NOT NULL, "apiKey" character varying NOT NULL, "state" character varying, "jwtToken" character varying, "jwtTokenExpiry" character varying, "refreshToken" character varying, "refreshTokenExpiry" character varying, "feedToken" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c39634ec05b1dca87624fd89c7f" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "broker_auths"`);
    await queryRunner.query(`DROP TABLE "brokers"`);
  }
}
