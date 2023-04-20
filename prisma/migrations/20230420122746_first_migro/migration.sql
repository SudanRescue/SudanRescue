-- CreateTable
CREATE TABLE "SafetyUpdate" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SafetyUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServicePost" (
    "id" SERIAL NOT NULL,
    "postType" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ServicePost_pkey" PRIMARY KEY ("id")
);
