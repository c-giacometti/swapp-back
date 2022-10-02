import * as productRepository from "../repositories/productRepository";
import { findUser } from "./userService";

export async function registerProduct(
    productData: productRepository.TProduct
){

    const { productName, minPrice, maxPrice, userId } = productData;

    //check if user exists
    await findUser(userId);

    //check if user already registered product
    const alreadyRegistered = await productRepository.findProductByUserIdAndProductName(userId, productName);

    if(alreadyRegistered.length > 0){
        throw {
            type: "error_conflict",
            message: "you already registered this product"
        }
    }

    //check if minPrice < maxPrice
    if(minPrice > maxPrice){
        throw {
            type: "error_bad_request",
            message: "min price should be equal to or lower than max price"
        }
    }

    //register product
    await productRepository.insertNewProduct(productData);

}

export async function getUserProducts(
    userId: number
){

    //check if user exists
    await findUser(userId);

    //get user's product list
    const userProducts = await productRepository.findProductByUserId(userId);

    return userProducts;

}

export async function findProduct(
    productId: number
){
    //check if product exists
    const product = await productRepository.findProductById(productId);

    if(!product){
        throw {
            type: "error_not_found",
            message: "product not found"
        }
    }

    //return product
    return product;

}

export async function updateProduct(
    productId: number,
    productData: productRepository.TProduct
) {
    const { userId, productName, description, minPrice, maxPrice, imgUrl } = productData;
    //check if user exists
    await findUser(userId);

    //check if product exists
    const product = await findProduct(productId);

    //check if product belongs to user
    if(product.userId !== userId){
        throw {
            type: "error_forbidden",
            message: "access denied"
        }
    }

    //update product info
    await productRepository.updateProduct(productId, productName, description, minPrice, maxPrice, imgUrl);

}

export async function deleteProduct(
    userId: number,
    productId: number
){
    
    //check if user exists
    await findUser(userId);

    //check if product exists
    const product = await findProduct(productId);

    //check if product belongs to user
    if(product.userId !== userId){
        throw {
            type: "error_forbidden",
            message: "access denied"
        }
    }

    //delete product
    await productRepository.deleteProduct(productId);

}