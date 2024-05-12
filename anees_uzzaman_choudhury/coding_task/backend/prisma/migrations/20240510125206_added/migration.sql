/*
  Warnings:

  - You are about to drop the column `likes` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `LikedPosts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LikedPosts" DROP CONSTRAINT "LikedPosts_userId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "likes";

-- DropTable
DROP TABLE "LikedPosts";

-- CreateTable
CREATE TABLE "UserLikes" (
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "UserLikes_pkey" PRIMARY KEY ("userId","postId")
);

-- AddForeignKey
ALTER TABLE "UserLikes" ADD CONSTRAINT "UserLikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLikes" ADD CONSTRAINT "UserLikes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("postId") ON DELETE RESTRICT ON UPDATE CASCADE;
