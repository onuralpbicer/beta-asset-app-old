-- CreateEnum
CREATE TYPE "Equipment_Type_Fields_Types" AS ENUM ('TEXT', 'NUMBER', 'TOGGLE', 'DROPDOWN');

-- CreateEnum
CREATE TYPE "Maintenance_Types" AS ENUM ('PERIODICAL', 'FAULT');

-- CreateEnum
CREATE TYPE "Maintenance_Status" AS ENUM ('GOOD', 'FIXED', 'REPLACED');

-- CreateTable
CREATE TABLE "Organisations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact_name" TEXT NOT NULL,
    "contact_email" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,

    CONSTRAINT "Organisations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment_Types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,

    CONSTRAINT "Equipment_Types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment_Type_Fields" (
    "id" TEXT NOT NULL,
    "equipment_type_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" "Equipment_Type_Fields_Types" NOT NULL,
    "min" INTEGER,
    "max" INTEGER,
    "unit" TEXT NOT NULL,
    "options" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Equipment_Type_Fields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipments" (
    "id" TEXT NOT NULL,
    "equipment_type_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "brand" TEXT,
    "serial_number" TEXT NOT NULL,

    CONSTRAINT "Equipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment_Fields" (
    "field_id" TEXT NOT NULL,
    "equipment_id" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Equipment_Fields_pkey" PRIMARY KEY ("field_id","equipment_id")
);

-- CreateTable
CREATE TABLE "Equipment_Type_Maintenance_Fields" (
    "id" TEXT NOT NULL,
    "equipment_type_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Equipment_Type_Maintenance_Fields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Maintenances" (
    "id" TEXT NOT NULL,
    "equipment_id" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" "Maintenance_Types" NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Maintenances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Maintenance_Fields" (
    "equipment_type_id" TEXT NOT NULL,
    "maintenance_id" TEXT NOT NULL,
    "status" "Maintenance_Status" NOT NULL,
    "notes" TEXT NOT NULL,

    CONSTRAINT "Maintenance_Fields_pkey" PRIMARY KEY ("equipment_type_id","maintenance_id")
);

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "Organisations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment_Types" ADD CONSTRAINT "Equipment_Types_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "Organisations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment_Type_Fields" ADD CONSTRAINT "Equipment_Type_Fields_equipment_type_id_fkey" FOREIGN KEY ("equipment_type_id") REFERENCES "Equipment_Types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipments" ADD CONSTRAINT "Equipments_equipment_type_id_fkey" FOREIGN KEY ("equipment_type_id") REFERENCES "Equipment_Types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment_Fields" ADD CONSTRAINT "Equipment_Fields_field_id_fkey" FOREIGN KEY ("field_id") REFERENCES "Equipment_Type_Fields"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment_Fields" ADD CONSTRAINT "Equipment_Fields_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "Equipments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment_Type_Maintenance_Fields" ADD CONSTRAINT "Equipment_Type_Maintenance_Fields_equipment_type_id_fkey" FOREIGN KEY ("equipment_type_id") REFERENCES "Equipment_Types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Maintenances" ADD CONSTRAINT "Maintenances_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "Equipments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Maintenances" ADD CONSTRAINT "Maintenances_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Maintenance_Fields" ADD CONSTRAINT "Maintenance_Fields_equipment_type_id_fkey" FOREIGN KEY ("equipment_type_id") REFERENCES "Equipment_Types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Maintenance_Fields" ADD CONSTRAINT "Maintenance_Fields_maintenance_id_fkey" FOREIGN KEY ("maintenance_id") REFERENCES "Maintenances"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
