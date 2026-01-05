/*
  Warnings:

  - A unique constraint covering the columns `[isReferenceMaterial]` on the table `ExercisesProgress` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ExercisesProgress" ADD COLUMN     "isReferenceMaterial" TEXT;

-- CreateTable
CREATE TABLE "ReferenceMaterial" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "marked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ReferenceMaterial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExercisesProgress_isReferenceMaterial_key" ON "ExercisesProgress"("isReferenceMaterial");
