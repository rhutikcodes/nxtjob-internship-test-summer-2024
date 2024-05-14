-- CreateTable
CREATE TABLE "PostData" (
    "postId" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "attachment" TEXT,
    "commentIdArray" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,
    "tagIdArray" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PostData_postId_key" ON "PostData"("postId");
