import { Request, Response, NextFunction } from "express";

type ErrorType = {
    type: string,
    message: string
}

export default function errorHandler(error: ErrorType, _req: Request, res: Response, _next: NextFunction){
    
    if(error.type === "error_bad_request"){
        return res.status(400).send(error.message);
    }

    if(error.type === "error_unauthorized"){
        return res.status(401).send(error.message);
    }

    if(error.type === "error_not_found"){
        return res.status(404).send(error.message);
    }

    if(error.type === "error_conflict"){
        return res.status(409).send(error.message);
    }

    if(error.type === "error_forbidden"){
        return res.status(403).send(error.message);
    }

    if(error.type === "error_unprocessable_entity"){
        return res.status(422).send(error.message);
    }

    return res.status(500).send(error.message);

}