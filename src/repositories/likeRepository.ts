import connection from "../config/prisma";
import { TMatch } from "./matchRepository";

export type TLike = {
    likingUserId: number,
    likingProductId: number
}

export async function createLike(likingUserId: number, likingProductId: number){

    const result = await connection.likes.create({
        data: {
            likingUserId,
            likingProductId
        }
    });

    return result;
}

export async function createIsLiked(likedUserId: number, likedProductId: number){

    const result = await connection.isLiked.create({
        data: {
            likedUserId,
            likedProductId
        }
    });

    return result;

}

export async function createLikeIsLiked(likesId: number, isLikedId: number){

    await connection.likesIsLiked.create({
        data: {
            likesId,
            isLikedId
        }
    });

}

export async function checkIfAlreadyLiked(likesId: number, isLikedId: number){

    const result = await connection.$queryRaw<TMatch>`
        SELECT "likesIsLiked".id, "likingProductId", "likedProductId" 
        FROM "likesIsLiked" 
        JOIN likes 
        ON likes.id="likesIsLiked"."likesId" 
        JOIN "isLiked" 
        ON "isLiked".id="likesIsLiked"."isLikedId"
        WHERE "likingProductId"=${likesId}
        AND "likedProductId"=${isLikedId}
    `

    return result;

}

export async function updateLikeIsLiked(id: number){

    await connection.likesIsLiked.update({
        where: { id },
        data: { isMatch: true }
    });

    return;

}