import { Request, Response } from "express";
import * as productService from "../services/productService";

export async function newProduct(req: Request, res: Response){

    const { productName, description, minPrice, maxPrice, imgUrl } = req.body;
    const { userId } = res.locals;

    const productData = {
        productName,
        description,
        minPrice,
        maxPrice,
        imgUrl,
        userId
    }

    await productService.registerProduct(productData);

    return res.status(201).send("product registered successfully");
    
}

export async function listProducts(req: Request, res: Response){

    const { userId } = res.locals;

    const userProducts = await productService.getUserProducts(userId);

    return res.status(200).send(userProducts);

}