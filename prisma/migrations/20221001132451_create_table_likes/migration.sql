-- CreateTable
CREATE TABLE "likes" (
    "id" SERIAL NOT NULL,
    "likedProductId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productLike" (
    "id" SERIAL NOT NULL,
    "likeId" INTEGER NOT NULL,
    "likingProductId" INTEGER NOT NULL,
    "likingUserId" INTEGER NOT NULL,

    CONSTRAINT "productLike_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_likedProductId_fkey" FOREIGN KEY ("likedProductId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productLike" ADD CONSTRAINT "productLike_likingUserId_fkey" FOREIGN KEY ("likingUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "productLike" ADD CONSTRAINT "productLike_likeId_fkey" FOREIGN KEY ("likeId") REFERENCES "likes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productLike" ADD CONSTRAINT "productLike_likingProductId_fkey" FOREIGN KEY ("likingProductId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
