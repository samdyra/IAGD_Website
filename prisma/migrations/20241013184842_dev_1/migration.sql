-- CreateTable
CREATE TABLE "Voter" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "voterToken" VARCHAR(255) NOT NULL,
    "phoneNumber" VARCHAR(255) NOT NULL,
    "hasVoted" BOOLEAN NOT NULL DEFAULT false,
    "choseCandidateNum" INTEGER NOT NULL,

    CONSTRAINT "Voter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Voter_voterToken_key" ON "Voter"("voterToken");

-- CreateIndex
CREATE UNIQUE INDEX "Voter_phoneNumber_key" ON "Voter"("phoneNumber");
