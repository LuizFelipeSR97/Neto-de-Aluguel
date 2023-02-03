-- AlterTable
ALTER TABLE "addresses" ALTER COLUMN "name" SET DEFAULT '',
ALTER COLUMN "country" SET DEFAULT '',
ALTER COLUMN "state" SET DEFAULT '',
ALTER COLUMN "city" SET DEFAULT '',
ALTER COLUMN "district" SET DEFAULT '',
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "conversations" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "messageStatus" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "messages" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "services" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "servicesStatus" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "userTypes" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "name" SET DEFAULT '',
ALTER COLUMN "email" SET DEFAULT '',
ALTER COLUMN "password" SET DEFAULT '',
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "usersStatus" ALTER COLUMN "updatedAt" DROP DEFAULT;
