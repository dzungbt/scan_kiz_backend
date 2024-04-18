const Joi = require("joi");

const accountDataCreate = (method) => {
    const objectSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        expireDate: Joi.date().required(),
        status: Joi.string().required()
    });

    return objectSchema.validate(method);
}


module.exports = {
    accountDataCreate: accountDataCreate,
}