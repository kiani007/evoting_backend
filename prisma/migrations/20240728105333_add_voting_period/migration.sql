/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isRole" "Role" NOT NULL DEFAULT 'USER',
ALTER COLUMN "voted_for_presidential_candidates" DROP DEFAULT,
ALTER COLUMN "voted_for_presidential_candidates" SET DATA TYPE TEXT,
ALTER COLUMN "voted_for_vice_presidential_candidates" DROP DEFAULT,
ALTER COLUMN "voted_for_vice_presidential_candidates" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Candidtes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "party_name" TEXT NOT NULL,
    "vote_counter" DECIMAL(65,30) NOT NULL,
    "position" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Candidtes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "feedback" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VotingPeriod" (
    "id" SERIAL NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VotingPeriod_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_userId_key" ON "Feedback"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");
