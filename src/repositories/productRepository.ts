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