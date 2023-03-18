/*
  Warnings:

  - You are about to drop the column `value` on the `Equipment_Type_Fields` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Equipment_Type_Fields" DROP COLUMN "value",
ALTER COLUMN "unit" DROP NOT NULL;
