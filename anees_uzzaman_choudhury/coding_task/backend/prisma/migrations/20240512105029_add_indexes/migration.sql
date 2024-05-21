-- CreateIndex
CREATE INDEX "idx_channelId_createdAt" ON "Post"("channelId", "createdAt");

-- CreateIndex
CREATE INDEX "idx_userId" ON "User"("userId");
