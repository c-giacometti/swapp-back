/*
  Warnings:

  - You are about to drop the column `likedProductId` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the `productLike` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `likingProductId` to the `likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likingUserId` to the `likes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_likedProductId_fkey";

-- DropForeignKey
ALTER TABLE "productLike" DROP CONSTRAINT "productLike_likeId_fkey";

-- DropForeignKey
ALTER TABLE "productLike" DROP CONSTRAINT "productLike_likingProductId_fkey";

-- DropForeignKey
ALTER TABLE "productLike" DROP CONSTRAINT "productLike_likingUserId_fkey";

-- AlterTable
ALTER TABLE "likes" DROP COLUMN "likedProductId",
ADD COLUMN     "likingProductId" INTEGER NOT NULL,
ADD COLUMN     "likingUserId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "productLike";

-- CreateTable
CREATE TABLE "isLiked" (
    "id" SERIAL NOT NULL,
    "likedProductId" INTEGER NOT NULL,
    "likedUserId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "isLiked_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likesIsLiked" (
    "id" SERIAL NOT NULL,
    "likesId" INTEGER NOT NULL,
    "isLikedId" INTEGER NOT NULL,
    "isMatch" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "likesIsLiked_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_likingUserId_fkey" FOREIGN KEY ("likingUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_likingProductId_fkey" FOREIGN KEY ("likingProductId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "isLiked" ADD CONSTRAINT "isLiked_likedUserId_fkey" FOREIGN KEY ("likedUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "isLiked" ADD CONSTRAINT "isLiked_likedProductId_fkey" FOREIGN KEY ("likedProductId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likesIsLiked" ADD CONSTRAINT "likesIsLiked_likesId_fkey" FOREIGN KEY ("likesId") REFERENCES "likes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "likesIsLiked" ADD CONSTRAINT "likesIsLiked_isLikedId_fkey" FOREIGN KEY ("isLikedId") REFERENCES "isLiked"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
