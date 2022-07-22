import { MigrationInterface, QueryRunner } from "typeorm";

export class metaproperties1658512613594 implements MigrationInterface {
    name = 'metaproperties1658512613594'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Package" ADD "numberOfDesigns" integer NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "Package" ADD "numberOfHashtags" integer NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "Package" ADD "numberOfSongs" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "Package" ADD "mustReachOut" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Package" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "Package" ADD "releaseDate" TIMESTAMP NOT NULL DEFAULT '"2022-07-22T17:56:57.402Z"'`);
        await queryRunner.query(`ALTER TABLE "Package" ADD "isPresented" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "Category" ADD "mustReachOut" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Category" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "Category" ADD "releaseDate" TIMESTAMP NOT NULL DEFAULT '"2022-07-22T17:56:57.406Z"'`);
        await queryRunner.query(`ALTER TABLE "Category" ADD "isPresented" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "Order" DROP CONSTRAINT "FK_d4a9b92ba4c1ab4c0475f2aeefd"`);
        await queryRunner.query(`ALTER TABLE "Order" DROP CONSTRAINT "FK_679abcf8c784dcd146c214dce5b"`);
        await queryRunner.query(`ALTER TABLE "Order" ALTER COLUMN "categoryId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Order" ALTER COLUMN "packageId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Order" ADD CONSTRAINT "FK_d4a9b92ba4c1ab4c0475f2aeefd" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Order" ADD CONSTRAINT "FK_679abcf8c784dcd146c214dce5b" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Order" DROP CONSTRAINT "FK_679abcf8c784dcd146c214dce5b"`);
        await queryRunner.query(`ALTER TABLE "Order" DROP CONSTRAINT "FK_d4a9b92ba4c1ab4c0475f2aeefd"`);
        await queryRunner.query(`ALTER TABLE "Order" ALTER COLUMN "packageId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Order" ALTER COLUMN "categoryId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Order" ADD CONSTRAINT "FK_679abcf8c784dcd146c214dce5b" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Order" ADD CONSTRAINT "FK_d4a9b92ba4c1ab4c0475f2aeefd" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Category" DROP COLUMN "isPresented"`);
        await queryRunner.query(`ALTER TABLE "Category" DROP COLUMN "releaseDate"`);
        await queryRunner.query(`ALTER TABLE "Category" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "Category" DROP COLUMN "mustReachOut"`);
        await queryRunner.query(`ALTER TABLE "Package" DROP COLUMN "isPresented"`);
        await queryRunner.query(`ALTER TABLE "Package" DROP COLUMN "releaseDate"`);
        await queryRunner.query(`ALTER TABLE "Package" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "Package" DROP COLUMN "mustReachOut"`);
        await queryRunner.query(`ALTER TABLE "Package" DROP COLUMN "numberOfSongs"`);
        await queryRunner.query(`ALTER TABLE "Package" DROP COLUMN "numberOfHashtags"`);
        await queryRunner.query(`ALTER TABLE "Package" DROP COLUMN "numberOfDesigns"`);
    }

}
