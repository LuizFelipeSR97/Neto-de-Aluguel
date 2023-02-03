/*
  Warnings:

  - You are about to drop the column `firstUserId` on the `conversations` table. All the data in the column will be lost.
  - You are about to drop the column `secondUserId` on the `conversations` table. All the data in the column will be lost.
  - Added the required column `helperId` to the `conversations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requesterId` to the `conversations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "conversations" DROP CONSTRAINT "conversations_firstUserId_fkey";

-- DropForeignKey
ALTER TABLE "conversations" DROP CONSTRAINT "conversations_secondUserId_fkey";

-- AlterTable
ALTER TABLE "conversations" DROP COLUMN "firstUserId",
DROP COLUMN "secondUserId",
ADD COLUMN     "helperId" INTEGER NOT NULL,
ADD COLUMN     "requesterId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_helperId_fkey" FOREIGN KEY ("helperId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
