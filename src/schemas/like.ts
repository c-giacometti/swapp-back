import joi from "joi";

export const likeSchema = joi.object({
    likedProductId: joi.number().required()
});