import connection from "../config/prisma";

export type TProduct = {
    productName: string,
    description: string,
    minPrice: number,
    maxPrice: number,
    imgUrl: string,
    userId: number
}

export async function insertNewProduct(productData: TProduct){

    const result = await connection.product.create({
        data: productData
    });

    return result;

}

export async function findProductByUserIdAndProductName(userId: number, productName: string){

    const result = await connection.product.findMany({
        where: { userId, productName }
    });

    return result;

}

export async function findProductByUserId(userId: number){

    const result = await connection.product.findMany({
        where: { userId }
    });

    return result;
}

export async function deleteProduct(id: number){

    await connection.product.delete({
        where: { id }
    });

    return;

}

export async function updateProduct(
    id: number, 
    productName: string, 
    description: string, 
    minPrice: number, 
    maxPrice: number,
    imgUrl: string
){

    await connection.product.update({
        where: { id },
        data: {
            productName,
            description,
            minPrice, 
            maxPrice,
            imgUrl
        }
    });

    return;

}

export async function findProductById(id: number){

    const result = await connection.product.findUnique({
        where: { id }
    });

    return result;

}

export async function filterProductsByPrice(userId: number, minPrice: number, maxPrice: number){

    const result = await connection.$queryRaw`SELECT * FROM products WHERE products."minPrice" >= ${minPrice} AND products."maxPrice" <= ${maxPrice} AND not products."userId" = ${userId}`;

    return result;

}