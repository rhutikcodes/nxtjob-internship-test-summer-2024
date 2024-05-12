-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastVisited" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "ChannelVisit" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "lastVisited" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChannelVisit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChannelVisit" ADD CONSTRAINT "ChannelVisit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
