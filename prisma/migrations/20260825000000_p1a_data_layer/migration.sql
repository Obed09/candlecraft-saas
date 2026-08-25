-- P1a: Persistent core (data layer)
-- Adds TestLog + BusinessConfig, and relaxes RecipeIngredient to allow
-- ingredients without a linked Product (graceful when the product is absent).

-- AlterTable: allow ingredients without a linked Product
ALTER TABLE "RecipeIngredient" ALTER COLUMN "productId" DROP NOT NULL;

-- AlterTable: add denormalized ingredient name column
ALTER TABLE "RecipeIngredient" ADD COLUMN "name" TEXT;

-- DropForeignKey
ALTER TABLE "RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_productId_fkey";

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "TestLog" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "candleId" TEXT,
    "candleName" TEXT,
    "wickType" TEXT,
    "coldThrow" INTEGER,
    "hotThrow" INTEGER,
    "burnTime" INTEGER,
    "tunnel" BOOLEAN NOT NULL DEFAULT false,
    "soot" BOOLEAN NOT NULL DEFAULT false,
    "mushroom" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "result" TEXT,
    "testDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TestLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessConfig" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "waxPrice" DOUBLE PRECISION,
    "fragrancePrice" DOUBLE PRECISION,
    "cementPrice" DOUBLE PRECISION,
    "wickPrice" DOUBLE PRECISION,
    "paintPrice" DOUBLE PRECISION,
    "defaultFillPercent" DOUBLE PRECISION DEFAULT 90,
    "defaultFragranceLoad" DOUBLE PRECISION DEFAULT 6,
    "currency" TEXT DEFAULT 'USD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TestLog_businessId_idx" ON "TestLog"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessConfig_businessId_key" ON "BusinessConfig"("businessId");

-- AddForeignKey
ALTER TABLE "TestLog" ADD CONSTRAINT "TestLog_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessConfig" ADD CONSTRAINT "BusinessConfig_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;
