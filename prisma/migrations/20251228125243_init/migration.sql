/*
  Warnings:

  - You are about to alter the column `status` on the `Booking` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - You are about to alter the column `role` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.
  - Added the required column `updatedAt` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Booking` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE `Trip` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `role` VARCHAR(191) NOT NULL;

-- RenameIndex
ALTER TABLE `Booking` RENAME INDEX `Booking_guideId_fkey` TO `Booking_guideId_idx`;

-- RenameIndex
ALTER TABLE `Booking` RENAME INDEX `Booking_provinceId_fkey` TO `Booking_provinceId_idx`;

-- RenameIndex
ALTER TABLE `Booking` RENAME INDEX `Booking_touristId_fkey` TO `Booking_touristId_idx`;

-- RenameIndex
ALTER TABLE `Booking` RENAME INDEX `Booking_tripId_fkey` TO `Booking_tripId_idx`;

-- RenameIndex
ALTER TABLE `Trip` RENAME INDEX `Trip_guideId_fkey` TO `Trip_guideId_idx`;

-- RenameIndex
ALTER TABLE `Trip` RENAME INDEX `Trip_provinceId_fkey` TO `Trip_provinceId_idx`;
