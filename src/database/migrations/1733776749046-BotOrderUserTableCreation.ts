import { MigrationInterface, QueryRunner } from "typeorm";

export class BotOrderUserTableCreation1733776749046 implements MigrationInterface {
    name = 'BotOrderUserTableCreation1733776749046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "strategies" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "slug" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_938a273cac0d7737a04e7604855" UNIQUE ("slug"), CONSTRAINT "PK_9a0d363ddf5b40d080147363238" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."trading_bots_sltype_enum" AS ENUM('fixed', 'trailing')`);
        await queryRunner.query(`CREATE TYPE "public"."trading_bots_orderside_enum" AS ENUM('buy', 'sell')`);
        await queryRunner.query(`CREATE TYPE "public"."trading_bots_tradetype_enum" AS ENUM('intraday', 'delivery', 'swing', 'positional', 'futures', 'options', 'auction')`);
        await queryRunner.query(`CREATE TYPE "public"."trading_bots_status_enum" AS ENUM('started', 'paused', 'running', 'stopped', 'disabled', 'suspended')`);
        await queryRunner.query(`CREATE TABLE "trading_bots" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "symbol" text array NOT NULL, "takeProfit" double precision NOT NULL, "stopLoss" double precision NOT NULL, "slType" "public"."trading_bots_sltype_enum" NOT NULL DEFAULT 'fixed', "orderSide" "public"."trading_bots_orderside_enum" NOT NULL, "tradeType" "public"."trading_bots_tradetype_enum" NOT NULL, "funds" double precision NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "status" "public"."trading_bots_status_enum" NOT NULL DEFAULT 'started', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "strategyId" integer, CONSTRAINT "PK_f626d6b223dce157257209ecc3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "tradeId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "botId" integer, "userId" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "trading_bots" ADD CONSTRAINT "FK_e96c60864cda6dab67e8adf0e42" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trading_bots" ADD CONSTRAINT "FK_a7e869b0606f33a5fed061b3ddf" FOREIGN KEY ("strategyId") REFERENCES "strategies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_cfb92c5e77eabf7708f684cd580" FOREIGN KEY ("botId") REFERENCES "trading_bots"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_cfb92c5e77eabf7708f684cd580"`);
        await queryRunner.query(`ALTER TABLE "trading_bots" DROP CONSTRAINT "FK_a7e869b0606f33a5fed061b3ddf"`);
        await queryRunner.query(`ALTER TABLE "trading_bots" DROP CONSTRAINT "FK_e96c60864cda6dab67e8adf0e42"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "trading_bots"`);
        await queryRunner.query(`DROP TYPE "public"."trading_bots_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."trading_bots_tradetype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."trading_bots_orderside_enum"`);
        await queryRunner.query(`DROP TYPE "public"."trading_bots_sltype_enum"`);
        await queryRunner.query(`DROP TABLE "strategies"`);
    }

}
