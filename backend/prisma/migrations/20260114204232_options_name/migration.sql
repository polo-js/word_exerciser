/*
  Warnings:

  - Added the required column `hrefToMaterials` to the `ReferenceMaterial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReferenceMaterial" ADD COLUMN     "hrefToMaterials" TEXT NOT NULL;
