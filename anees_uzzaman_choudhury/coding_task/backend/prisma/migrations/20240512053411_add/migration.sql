-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bookmarks" TEXT[] DEFAULT ARRAY[]::TEXT[];
