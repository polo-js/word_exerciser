/*
  Warnings:

  - Added the required column `imgSrc` to the `ReferenceMaterial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReferenceMaterial" ADD COLUMN     "imgSrc" TEXT NOT NULL;
