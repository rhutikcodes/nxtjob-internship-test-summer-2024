-- CreateTable
CREATE TABLE "NotificationData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "NotificationData_id_key" ON "NotificationData"("id");
