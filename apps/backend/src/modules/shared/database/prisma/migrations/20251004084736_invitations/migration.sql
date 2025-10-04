/*
  Warnings:

  - You are about to drop the column `userId` on the `Signup` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Signup" DROP CONSTRAINT "Signup_userId_fkey";

-- AlterTable
ALTER TABLE "Signup" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "Invitation" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'DEVELOPER',
    "inviterId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "acceptedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_token_key" ON "Invitation"("token");

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
