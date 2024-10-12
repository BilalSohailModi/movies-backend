import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1728711276123 implements MigrationInterface {
    name = 'InitialMigration1728711276123'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "publishingYear" integer NOT NULL, "poster" character varying NOT NULL DEFAULT true, "deleted_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "createdById" uuid NOT NULL, CONSTRAINT "UQ_0c167907078cd9e3fcfb4f5292c" UNIQUE ("title"), CONSTRAINT "PK_b480180e403fdd345b2cfe9204a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_c4338d751407b6a34dfb44cd556" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_c4338d751407b6a34dfb44cd556"`);
        await queryRunner.query(`DROP TABLE "movie"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
