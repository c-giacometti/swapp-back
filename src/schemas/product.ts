import joi from "joi";

export const productSchema = joi.object({
    productName: joi.string().max(50).required(),
    description: joi.string().max(300).required(),
    minPrice: joi.number().greater(0).required(),
    maxPrice: joi.number().greater(0).required(),
    imgUrl: joi.string().required()
});