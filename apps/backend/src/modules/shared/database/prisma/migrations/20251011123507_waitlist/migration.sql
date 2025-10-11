/*
  Warnings:

  - You are about to drop the column `rewardType` on the `ReferralSystem` table. All the data in the column will be lost.
  - You are about to drop the column `rewardValue` on the `ReferralSystem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NotificationSetting" ADD COLUMN     "emailDashboardLink" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ReferralSystem" DROP COLUMN "rewardType",
DROP COLUMN "rewardValue",
ADD COLUMN     "incentiveType" TEXT,
ADD COLUMN     "incentiveValue" TEXT;
