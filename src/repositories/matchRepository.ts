import connection from "../config/prisma";

export type TMatch = [{
    id: number,
    likingProductId: number,
    likedProductId: number
}];

export async function checkIfItsAMatch(likesId: number, isLikedId: number){

    const result = await connection.$queryRaw<TMatch>`
        SELECT "likesIsLiked".id, "likingProductId", "likedProductId"
        FROM "likesIsLiked" 
        JOIN likes 
        ON likes.id="likesIsLiked"."likesId" 
        JOIN "isLiked" 
        ON "isLiked".id="likesIsLiked"."isLikedId"
        WHERE "likingProductId"=${isLikedId}
        AND "likedProductId"=${likesId}
    `

    return result;
    
}