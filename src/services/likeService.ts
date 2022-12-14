import * as likeRepository from "../repositories/likeRepository";
import * as userService from "../services/userService";
import * as productService from "../services/productService";
import { checkIfItsAMatch } from "../repositories/matchRepository";

export async function likeProduct(
    userId: number,
    likingProductId: number,
    likedProductId: number
) {

    let match: boolean = false;

    //check if user exists
    await userService.findUser(userId);

    //check if traded products exist
    const likingProduct = await productService.findProduct(likingProductId);
    const likedProduct = await productService.findProduct(likedProductId);

    //check if traded product belongs to trading user
    productService.checkUserProduct(likingProduct.userId, userId);

    //check if already liked
    const alreadyLiked = await likeRepository.checkIfAlreadyLiked(likingProductId, likedProductId);

    if(alreadyLiked.length > 0){
        return;
    }

    //check if like is a match
    const itsAMatch = await checkIfItsAMatch(likingProductId, likedProductId);

    if(itsAMatch.length > 0){

        updateMatch(itsAMatch[0].id);
        match = true;

    } 

    insertLikes(likingProduct.userId, likingProductId, likedProduct.userId, likedProductId, match);

    return match;

}

export async function insertLikes(
    likingProductUserId: number, 
    likingProductId: number, 
    likedProductUserId: number,
    likedProductId: number,
    isMatch: boolean
) {

    //insert like
    const likes = await likeRepository.createLike(likingProductUserId, likingProductId);

    //insert is liked
    const isLiked = await likeRepository.createIsLiked(likedProductUserId, likedProductId);

    //insert likeIsLiked
    await likeRepository.createLikeIsLiked(likes.id, isLiked.id, isMatch);

    return;

}

export async function updateMatch(
    likeIsLikedId: number
){

    await likeRepository.updateLikeIsLiked(likeIsLikedId);

    return;

}