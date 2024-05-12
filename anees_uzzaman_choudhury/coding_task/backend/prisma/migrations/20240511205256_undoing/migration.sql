/*
  Warnings:

  - You are about to drop the column `lastVisited` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `ChannelVisit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChannelVisit" DROP CONSTRAINT "ChannelVisit_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "lastVisited";

-- DropTable
DROP TABLE "ChannelVisit";
