/*
  Warnings:

  - You are about to drop the column `serviceId` on the `conversations` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "conversations" DROP CONSTRAINT "conversations_serviceId_fkey";

-- AlterTable
ALTER TABLE "conversations" DROP COLUMN "serviceId";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "description";
