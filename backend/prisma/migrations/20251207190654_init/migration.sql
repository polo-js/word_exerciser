-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT,
    "passwordEncoded" TEXT NOT NULL,
    "login" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageSrc" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExercisesTypes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,

    CONSTRAINT "ExercisesTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "category" INTEGER NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExercisesProgress" (
    "id" SERIAL NOT NULL,
    "user" INTEGER NOT NULL,
    "exercise" INTEGER NOT NULL,
    "passedCount" INTEGER NOT NULL,

    CONSTRAINT "ExercisesProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExercisesExpressions" (
    "id" SERIAL NOT NULL,
    "expression" TEXT NOT NULL,
    "answer" INTEGER NOT NULL,
    "example" TEXT,
    "translatedExample" TEXT,
    "exercise" INTEGER NOT NULL,
    "description" TEXT,
    "textWithSelect" TEXT,

    CONSTRAINT "ExercisesExpressions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExercisesExpressionsAnswer" (
    "id" SERIAL NOT NULL,
    "expression" TEXT NOT NULL,

    CONSTRAINT "ExercisesExpressionsAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AnswerOptions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AnswerOptions_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExercisesProgress_user_exercise_key" ON "ExercisesProgress"("user", "exercise");

-- CreateIndex
CREATE INDEX "_AnswerOptions_B_index" ON "_AnswerOptions"("B");

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_type_fkey" FOREIGN KEY ("type") REFERENCES "ExercisesTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_category_fkey" FOREIGN KEY ("category") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExercisesProgress" ADD CONSTRAINT "ExercisesProgress_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExercisesProgress" ADD CONSTRAINT "ExercisesProgress_exercise_fkey" FOREIGN KEY ("exercise") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExercisesExpressions" ADD CONSTRAINT "ExercisesExpressions_answer_fkey" FOREIGN KEY ("answer") REFERENCES "ExercisesExpressionsAnswer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExercisesExpressions" ADD CONSTRAINT "ExercisesExpressions_exercise_fkey" FOREIGN KEY ("exercise") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnswerOptions" ADD CONSTRAINT "_AnswerOptions_A_fkey" FOREIGN KEY ("A") REFERENCES "ExercisesExpressions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnswerOptions" ADD CONSTRAINT "_AnswerOptions_B_fkey" FOREIGN KEY ("B") REFERENCES "ExercisesExpressionsAnswer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
