/*
  Warnings:

  - A unique constraint covering the columns `[userId,channelId]` on the table `ChannelVisit` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ChannelVisit_userId_channelId_key" ON "ChannelVisit"("userId", "channelId");
