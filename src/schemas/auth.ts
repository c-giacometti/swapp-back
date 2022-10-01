import joi from "joi";

export const userSchema = joi.object({
    email: joi.string().trim().email().required(),
    password: joi.string().trim().required(),
});

export const newUserSChema = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref("password")
});