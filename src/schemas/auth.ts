import joi from "joi";

export const userSchema = joi.object({
    email: joi.string().trim().email().required(),
    password: joi.string().trim().required(),
});