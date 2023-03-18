/*
  Warnings:

  - The primary key for the `Maintenance_Fields` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `equipment_type_id` on the `Maintenance_Fields` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[field_id,maintenance_id]` on the table `Maintenance_Fields` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `field_id` to the `Maintenance_Fields` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Maintenance_Fields" DROP CONSTRAINT "Maintenance_Fields_equipment_type_id_fkey";

-- AlterTable
ALTER TABLE "Maintenance_Fields" DROP CONSTRAINT "Maintenance_Fields_pkey",
DROP COLUMN "equipment_type_id",
ADD COLUMN     "equipment_TypesId" TEXT,
ADD COLUMN     "field_id" TEXT NOT NULL,
ADD CONSTRAINT "Maintenance_Fields_pkey" PRIMARY KEY ("field_id", "maintenance_id");

-- CreateIndex
CREATE UNIQUE INDEX "Maintenance_Fields_field_id_maintenance_id_key" ON "Maintenance_Fields"("field_id", "maintenance_id");

-- AddForeignKey
ALTER TABLE "Maintenance_Fields" ADD CONSTRAINT "Maintenance_Fields_field_id_fkey" FOREIGN KEY ("field_id") REFERENCES "Equipment_Type_Maintenance_Fields"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Maintenance_Fields" ADD CONSTRAINT "Maintenance_Fields_equipment_TypesId_fkey" FOREIGN KEY ("equipment_TypesId") REFERENCES "Equipment_Types"("id") ON DELETE SET NULL ON UPDATE CASCADE;
