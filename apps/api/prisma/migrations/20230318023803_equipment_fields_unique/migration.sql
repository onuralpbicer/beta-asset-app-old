/*
  Warnings:

  - A unique constraint covering the columns `[field_id,equipment_id]` on the table `Equipment_Fields` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Equipment_Fields_field_id_equipment_id_key" ON "Equipment_Fields"("field_id", "equipment_id");
