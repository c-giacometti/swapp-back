import { Request, Response } from "express";
import * as matchService from "../services/matchService";

export async function showMatchs(req: Request, res: Response){

    const { userId } = res.locals;

    const matchs = await matchService.getMatchs(userId);

    return res.status(200).send(matchs);
    
}