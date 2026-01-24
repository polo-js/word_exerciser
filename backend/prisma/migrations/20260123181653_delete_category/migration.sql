/*
  Warnings:

  - You are about to drop the column `category` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `imgSrc` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_category_fkey";


-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "category",
ADD COLUMN     "imgSrc" TEXT NOT NULL;

-- DropTable
DROP TABLE "Category";
TRUNCATE TABLE "Exercise" CASCADE;
