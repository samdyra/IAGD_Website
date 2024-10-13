/*
  Warnings:

  - You are about to drop the column `choseCandidateNum` on the `Voter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Voter" DROP COLUMN "choseCandidateNum",
ADD COLUMN     "choseHeadCandidateNum" INTEGER,
ADD COLUMN     "choseViceHeadCandidateNums" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
