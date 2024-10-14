/*
  Warnings:

  - You are about to drop the column `choseViceHeadCandidateNums` on the `Voter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Voter" DROP COLUMN "choseViceHeadCandidateNums",
ADD COLUMN     "choseViceHeadCandidateNum" INTEGER;
