import connection from "../config/prisma";

export async function checkIfItsAMatch(likesId: number, isLikedId: number){

    const result = await connection.likesIsLiked.findFirst({
        where: {
            likesId,
            isLikedId
        }
    });

    return result;
    
}