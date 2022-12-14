import connection from "../config/prisma";

export type TUserData = {
    username: string,
    email: string,
    password: string
}

export async function findUserById(id: number){

    const result = await connection.user.findUnique({
        where: { id }
    });

    return result;

}

export async function findUserByEmail(email: string){

    const result = await connection.user.findUnique({
        where: { email }
    });

    return result;

}

export async function findUserByUsername(username: string){

    const result = await connection.user.findUnique({
        where: { username }
    });

    return result;

}

export async function insertNewUser(userData: TUserData){

    const { username, email, password } = userData;

    await connection.user.create({
        data: { username, email, password } 
    });

}
