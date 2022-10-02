import jwt from 'jsonwebtoken';
import * as userRepository from "../repositories/userRepository";
import { decryptPasswords, encryptPasswords } from "../utils/encryptUtil";

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
    const validPassword = await decryptPasswords(password, user.password);

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

export async function registerNewUser(
    username: string,
    email: string,
    password: string,
    confirmPassword: string
) {

    //check if password and confirmation match
    if(password !== confirmPassword){
        throw {
            type: "error_unprocessable_entity",
            message: "incorrect data"
        }
    }

    //check if username is already registered
    const usernameInUse = await userRepository.findUserByUsername(username);

    if(usernameInUse){
        throw{
            type: "error_conflict",
            message: "username already in use"
        }
    }

    //check if email is already registered
    const registeredEmail = await userRepository.findUserByEmail(email);

    if(registeredEmail){
        throw{
            type: "error_conflict",
            message: "you already have an account"
        }
    }

    //encrypt password
    const hashedPassword = await encryptPasswords(password);

    //insert into db
    await userRepository.insertNewUser({
        username, 
        email, 
        password: hashedPassword
    });
    
}