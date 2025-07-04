/*
  Warnings:

  - You are about to drop the column `media_url` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "media_url",
ADD COLUMN     "image" TEXT;
