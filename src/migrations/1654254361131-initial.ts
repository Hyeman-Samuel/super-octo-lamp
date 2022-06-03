import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1654254361131 implements MigrationInterface {
    name = 'initial1654254361131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Frame" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "link" character varying NOT NULL, "name" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" uuid, CONSTRAINT "PK_11dd9d82298b94b516d77aa0d6b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "OrderDetails" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "link" character varying, "status" character varying NOT NULL DEFAULT 'PROCESSING', "currency" character varying NOT NULL DEFAULT 'NGN', "price" numeric(10,2) NOT NULL DEFAULT '0', "platformName" character varying NOT NULL, "orderId" uuid, "platformId" uuid, CONSTRAINT "PK_2eba2fc21f8b7110f1d056ca42c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Platform" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9f6a04e4c4f5c288ea71411fbc1" UNIQUE ("name"), CONSTRAINT "PK_c6d90abcc707215d1c4ec2ce936" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "PackagePlatform" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "packageId" uuid NOT NULL, "platformId" uuid NOT NULL, "price" numeric(10,2) NOT NULL DEFAULT '0', "currency" character varying NOT NULL DEFAULT 'NGN', "createdDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7fb3f97c3fe52ac0aaa1e2f2463" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Package" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "alias" character varying NOT NULL, "description" character varying NOT NULL, "infographicVideos" jsonb, "active" boolean NOT NULL DEFAULT true, "currency" character varying NOT NULL DEFAULT 'NGN', "basePrice" numeric(10,2) DEFAULT '0', "createdDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d1fbca8e05429a789e53cb0b604" UNIQUE ("alias"), CONSTRAINT "PK_ab000fbbab38ed81e511ac3146f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "PackageCategory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "packageId" uuid NOT NULL, "categoryId" uuid NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24e19b25058a40622a5bb78420c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "alias" character varying NOT NULL, "description" character varying NOT NULL, "thumbnailLink" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_001cfa712cc985ae708dccf43ca" UNIQUE ("alias"), CONSTRAINT "PK_c2727780c5b9b0c564c29a4977c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "orderRefrence" character varying NOT NULL, "paymentRefrence" character varying, "price" numeric(10,2) NOT NULL DEFAULT '0', "currency" character varying NOT NULL DEFAULT 'NGN', "stage" character varying NOT NULL DEFAULT 'PENDING_PAYMENT', "deliveryMessage" character varying, "email" character varying NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "designImages" jsonb, "hashtags" jsonb, "songs" jsonb, "paidOn" TIMESTAMP, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" uuid, "packageId" uuid, "customerId" uuid, "arDevId" uuid, CONSTRAINT "PK_3d5a3861d8f9a6db372b2b317b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "User" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "hash" character varying NOT NULL, "salt" character varying NOT NULL, "role" character varying NOT NULL, "currentWorkload" integer NOT NULL DEFAULT '0', "createdDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Frame" ADD CONSTRAINT "FK_3661a5ec4b06dc2c4b66256f92b" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "OrderDetails" ADD CONSTRAINT "FK_f10ae0c65cac3856eb0017feaaf" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "OrderDetails" ADD CONSTRAINT "FK_fbf754a3825a0fd216a50acfd9c" FOREIGN KEY ("platformId") REFERENCES "Platform"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "PackagePlatform" ADD CONSTRAINT "FK_9273dcb26fed5781983e893e52f" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "PackagePlatform" ADD CONSTRAINT "FK_927d14b5804357b0f95e349e945" FOREIGN KEY ("platformId") REFERENCES "Platform"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "PackageCategory" ADD CONSTRAINT "FK_d2e53fa4c716e112d866010f3c9" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "PackageCategory" ADD CONSTRAINT "FK_63887ef09168c972c7efcbbb901" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Order" ADD CONSTRAINT "FK_d4a9b92ba4c1ab4c0475f2aeefd" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Order" ADD CONSTRAINT "FK_679abcf8c784dcd146c214dce5b" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Order" ADD CONSTRAINT "FK_0f88449168b8ffae36cb3f8a140" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Order" ADD CONSTRAINT "FK_0ac6f9cce3d79db94f82c24ac6a" FOREIGN KEY ("arDevId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Order" DROP CONSTRAINT "FK_0ac6f9cce3d79db94f82c24ac6a"`);
        await queryRunner.query(`ALTER TABLE "Order" DROP CONSTRAINT "FK_0f88449168b8ffae36cb3f8a140"`);
        await queryRunner.query(`ALTER TABLE "Order" DROP CONSTRAINT "FK_679abcf8c784dcd146c214dce5b"`);
        await queryRunner.query(`ALTER TABLE "Order" DROP CONSTRAINT "FK_d4a9b92ba4c1ab4c0475f2aeefd"`);
        await queryRunner.query(`ALTER TABLE "PackageCategory" DROP CONSTRAINT "FK_63887ef09168c972c7efcbbb901"`);
        await queryRunner.query(`ALTER TABLE "PackageCategory" DROP CONSTRAINT "FK_d2e53fa4c716e112d866010f3c9"`);
        await queryRunner.query(`ALTER TABLE "PackagePlatform" DROP CONSTRAINT "FK_927d14b5804357b0f95e349e945"`);
        await queryRunner.query(`ALTER TABLE "PackagePlatform" DROP CONSTRAINT "FK_9273dcb26fed5781983e893e52f"`);
        await queryRunner.query(`ALTER TABLE "OrderDetails" DROP CONSTRAINT "FK_fbf754a3825a0fd216a50acfd9c"`);
        await queryRunner.query(`ALTER TABLE "OrderDetails" DROP CONSTRAINT "FK_f10ae0c65cac3856eb0017feaaf"`);
        await queryRunner.query(`ALTER TABLE "Frame" DROP CONSTRAINT "FK_3661a5ec4b06dc2c4b66256f92b"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TABLE "Order"`);
        await queryRunner.query(`DROP TABLE "Category"`);
        await queryRunner.query(`DROP TABLE "PackageCategory"`);
        await queryRunner.query(`DROP TABLE "Package"`);
        await queryRunner.query(`DROP TABLE "PackagePlatform"`);
        await queryRunner.query(`DROP TABLE "Platform"`);
        await queryRunner.query(`DROP TABLE "OrderDetails"`);
        await queryRunner.query(`DROP TABLE "Frame"`);
    }

}
