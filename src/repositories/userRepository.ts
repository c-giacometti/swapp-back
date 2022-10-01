import connection from "../config/prisma";
import User from "@prisma/client";

export async function findUserByEmail(email: string){

    const result = await connection.user.findUnique({
        where: { email }
    });

    return result;

}