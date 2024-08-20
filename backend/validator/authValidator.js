const Joi = require('joi');
const responses = require('../helpers/response');


const loginValidator = async (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });

    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        return responses.errorResponse(req, res, error, 400);
    }
};

module.exports = {
    loginValidator
};
