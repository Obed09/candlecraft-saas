-- P1b: Fix schema-vs-migration drift for Subscription + CustomVessel
-- Adds the trial / locked-free columns to "Subscription" that are declared in
-- schema.prisma but were never emitted by the init or p1a migrations, and
-- creates the "CustomVessel" table that is declared in schema.prisma but had no
-- migration creating it.

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN "trialEndsAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN "isOnTrial" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN "isLockedFree" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "CustomVessel" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "diameter" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL DEFAULT 'cm',
    "imageData" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomVessel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CustomVessel_businessId_idx" ON "CustomVessel"("businessId");

-- AddForeignKey
ALTER TABLE "CustomVessel" ADD CONSTRAINT "CustomVessel_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;
