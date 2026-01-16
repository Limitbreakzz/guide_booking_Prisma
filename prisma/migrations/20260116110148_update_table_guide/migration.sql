/*
  Warnings:

  - You are about to drop the column `userId` on the `Guide` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Guide` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Guide` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Guide` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Guide` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Guide_userId_key` ON `Guide`;

-- AlterTable
ALTER TABLE `Guide` DROP COLUMN `userId`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `tel` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Guide_email_key` ON `Guide`(`email`);
