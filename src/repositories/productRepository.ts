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