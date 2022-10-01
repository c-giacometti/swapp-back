import { Request, Response } from "express";
import * as userService from "../services/userService";

export async function login(req: Request, res: Response) {

    const { email, password } = req.body;

    const { token } = await userService.loginUser(email, password);
    
    return res.status(200).send({ token });

}