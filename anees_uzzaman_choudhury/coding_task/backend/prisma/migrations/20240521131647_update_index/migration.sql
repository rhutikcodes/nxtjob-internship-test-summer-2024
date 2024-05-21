-- DropIndex
DROP INDEX "Post_channelId_idx";

-- CreateIndex
CREATE INDEX "Post_channelId_idx" ON "Post" USING HASH ("channelId");
