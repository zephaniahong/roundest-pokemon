-- CreateTable
CREATE TABLE "Vote" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "votedFor" INT4 NOT NULL,
    "votedAgainst" INT4 NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);
