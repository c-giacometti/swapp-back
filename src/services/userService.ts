import { findUserByEmail } from "../repositories/userRepository";

export async function loginUser(
    email: string,
    password: string
) {
    //check if user exists
    const user = await findUserByEmail(email);

    if(!user){
        throw {
            type: "error_unauthorized",
            message: "incorrect data"
        }
    }

    //check password

    //generate token
}