const Joi = require("joi");

const productsImportValidate = (method) => {
    const objectSchema = Joi.object({
        id: Joi.number().required(),
        number: Joi.required(),
        sticker: Joi.required(),
        kiz: Joi.any().allow(null),
        status: Joi.string().valid('pending', 'completed').required(),
    });
    const arraySchema = Joi.array().items(objectSchema);

    return arraySchema.validate(method);
}


module.exports = {
    productsImportValidate: productsImportValidate,
}