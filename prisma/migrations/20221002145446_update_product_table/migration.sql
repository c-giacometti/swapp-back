/*
  Warnings:

  - A unique constraint covering the columns `[productName,userId]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "products_productName_userId_key" ON "products"("productName", "userId");
