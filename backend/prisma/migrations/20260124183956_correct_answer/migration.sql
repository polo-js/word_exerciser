/*
  Warnings:

  - Added the required column `correctAnswerId` to the `ExercisesExpression` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExercisesExpression" DROP CONSTRAINT "ExercisesExpression_answer_fkey";

-- AlterTable
ALTER TABLE "ExercisesExpression" ADD COLUMN     "correctAnswerId" INTEGER NOT NULL;
