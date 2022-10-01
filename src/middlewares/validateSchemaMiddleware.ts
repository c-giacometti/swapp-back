import { NextFunction, Request, Response } from 'express';
import schemas from '../schemas/schemas';

type SchemasTypes = keyof typeof schemas;

function validateSchema(schema: SchemasTypes) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schemas[schema].validate(req.body, { abortEarly: false });

        if (error) {
            throw {
                type: "error_unprocessable_entity",
                message: "incorrect data format"
            }
        }

        return next();
    };
}

export default validateSchema;
