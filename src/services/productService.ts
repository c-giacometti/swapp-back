import * as productRepository from "../repositories/productRepository";
import { findUser } from "./userService";

export async function registerProduct(
    productData: productRepository.TProduct
){

    const { productName, description, minPrice, maxPrice, imgUrl, userId } = productData;
    //check if user exists
    const user = await findUser(userId);

    if(!user){
        throw {
            type: "error_not_found",
            message: "user not found"
        }
    }

    //check if user already registered product
    const alreadyRegistered = await productRepository.findProductByUserIdAndProductName(userId, productName);

    if(alreadyRegistered){
        throw {
            type: "error_conflict",
            message: "you already registered this product"
        }
    }

    //register product
    await productRepository.insertNewProduct(productData);

}