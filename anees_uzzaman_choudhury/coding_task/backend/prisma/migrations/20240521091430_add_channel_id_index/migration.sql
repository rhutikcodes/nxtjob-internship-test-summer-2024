-- DropIndex
DROP INDEX "idx_channelId_createdAt";

-- CreateIndex
CREATE INDEX "Post_channelId_idx" ON "Post"("channelId");
