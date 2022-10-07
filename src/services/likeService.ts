import * as likeRepository from "../repositories/likeRepository";
import * as userService from "../services/userService";
import * as productService from "../services/productService";

export async function likeProduct(
    userId: number,
    likingProductId: number,
    likedProductId: number
) {

    //check if user exists
    await userService.findUser(userId);

    //check if traded products exist
    const likingProduct = await productService.findProduct(likingProductId);
    const likedProduct = await productService.findProduct(likedProductId);

    //check if traded product belongs to trading user
    productService.checkUserProduct(likingProduct.userId, userId);

    //check if like is a match

    //insert like
    const likes = await likeRepository.createLike(likingProduct.userId, likingProductId);

    //insert is liked
    const isLiked = await likeRepository.createIsLiked(likedProduct.userId, likedProductId);

    //insert likeIsLiked
    await likeRepository.createLikeIsLiked(likes.id, isLiked.id);

}