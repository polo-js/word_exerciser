/*
  Warnings:

  - You are about to drop the column `marked` on the `ReferenceMaterial` table. All the data in the column will be lost.
  - You are about to drop the `ExercisesExpressions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExercisesProgress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExercisesExpressions" DROP CONSTRAINT "ExercisesExpressions_answer_fkey";

-- DropForeignKey
ALTER TABLE "ExercisesExpressions" DROP CONSTRAINT "ExercisesExpressions_exercise_fkey";

-- DropForeignKey
ALTER TABLE "ExercisesProgress" DROP CONSTRAINT "ExercisesProgress_exercise_fkey";

-- DropForeignKey
ALTER TABLE "ExercisesProgress" DROP CONSTRAINT "ExercisesProgress_user_fkey";

-- DropForeignKey
ALTER TABLE "_AnswerOptions" DROP CONSTRAINT "_AnswerOptions_A_fkey";

-- AlterTable
ALTER TABLE "ReferenceMaterial" DROP COLUMN "marked";

-- DropTable
DROP TABLE "ExercisesExpressions";

-- DropTable
DROP TABLE "ExercisesProgress";

-- CreateTable
CREATE TABLE "ExerciseExpressionProgress" (
    "id" SERIAL NOT NULL,
    "user" INTEGER NOT NULL,
    "exerciseExpression" INTEGER NOT NULL,

    CONSTRAINT "ExerciseExpressionProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferenceMaterialProgress" (
    "id" SERIAL NOT NULL,
    "user" INTEGER NOT NULL,
    "referenceMaterial" INTEGER NOT NULL,

    CONSTRAINT "ReferenceMaterialProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExercisesExpression" (
    "id" SERIAL NOT NULL,
    "expression" TEXT NOT NULL,
    "answer" INTEGER NOT NULL,
    "example" TEXT,
    "translatedExample" TEXT,
    "exercise" INTEGER NOT NULL,
    "description" TEXT,
    "textWithSelect" TEXT,

    CONSTRAINT "ExercisesExpression_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseExpressionProgress_user_exerciseExpression_key" ON "ExerciseExpressionProgress"("user", "exerciseExpression");

-- CreateIndex
CREATE UNIQUE INDEX "ReferenceMaterialProgress_user_referenceMaterial_key" ON "ReferenceMaterialProgress"("user", "referenceMaterial");

-- AddForeignKey
ALTER TABLE "ExerciseExpressionProgress" ADD CONSTRAINT "ExerciseExpressionProgress_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseExpressionProgress" ADD CONSTRAINT "ExerciseExpressionProgress_exerciseExpression_fkey" FOREIGN KEY ("exerciseExpression") REFERENCES "ExercisesExpression"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferenceMaterialProgress" ADD CONSTRAINT "ReferenceMaterialProgress_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferenceMaterialProgress" ADD CONSTRAINT "ReferenceMaterialProgress_referenceMaterial_fkey" FOREIGN KEY ("referenceMaterial") REFERENCES "ReferenceMaterial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExercisesExpression" ADD CONSTRAINT "ExercisesExpression_answer_fkey" FOREIGN KEY ("answer") REFERENCES "ExercisesExpressionsAnswer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExercisesExpression" ADD CONSTRAINT "ExercisesExpression_exercise_fkey" FOREIGN KEY ("exercise") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnswerOptions" ADD CONSTRAINT "_AnswerOptions_A_fkey" FOREIGN KEY ("A") REFERENCES "ExercisesExpression"("id") ON DELETE CASCADE ON UPDATE CASCADE;
