import { Request, Response } from "express";
import * as likeService from "../services/likeService";
import { validateId } from "./productController";

export async function likeProduct(req: Request, res: Response){

    const { id } = req.params;
    const { userId } = res.locals;
    const { likedProductId } = req.body;

    validateId(id);

    await likeService.likeProduct(userId, parseInt(id), likedProductId);

    return res.status(201).send("like registered successfully");

}