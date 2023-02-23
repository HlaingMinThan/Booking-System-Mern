/*
  Warnings:

  - You are about to drop the column `user_id` on the `Place` table. All the data in the column will be lost.
  - Added the required column `owner_id` to the `Place` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Place` DROP FOREIGN KEY `Place_user_id_fkey`;

-- AlterTable
ALTER TABLE `Place` DROP COLUMN `user_id`,
    ADD COLUMN `owner_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Place` ADD CONSTRAINT `Place_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
