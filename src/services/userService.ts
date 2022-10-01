import jwt from 'jsonwebtoken';
import * as userRepository from "../repositories/userRepository";
import { decryptPasswords } from "../utils/encryptUtil";

export async function loginUser(
    email: string,
    password: string
) {
    //check if user exists
    const user = await userRepository.findUserByEmail(email);

    if(!user){
        throw {
            type: "error_unauthorized",
            message: "incorrect data"
        }
    }

    //check password
    const validPassword = decryptPasswords(password, user.password);

    if(!validPassword){
        throw {
            type: "error_unauthorized",
            message: "incorrect data"
        }
    }

    //generate token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '60min' });

    return { token };

}