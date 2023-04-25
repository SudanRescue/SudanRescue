/*
  Warnings:

  - You are about to drop the column `contactPhoneNumber` on the `BusTrip` table. All the data in the column will be lost.
  - Added the required column `contactNumber` to the `BusTrip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BusTrip" DROP COLUMN "contactPhoneNumber",
ADD COLUMN     "contactNumber" TEXT NOT NULL;
