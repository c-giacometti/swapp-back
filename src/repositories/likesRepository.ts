import connection from "../config/prisma";

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


