/*
  Warnings:

  - Added the required column `price` to the `Place` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Place` ADD COLUMN `price` DOUBLE NOT NULL;
