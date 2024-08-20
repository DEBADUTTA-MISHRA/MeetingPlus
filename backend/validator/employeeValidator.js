const Joi = require('joi');
const responses = require('../helpers/response');
var regularExpression = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const createEmployeeValidator = async (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().trim().pattern(/^[0-9a-zA-Z ,/-]+$/).required().messages({
            "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        }),
        email: Joi.string().email().required(),
        phone: Joi.string().pattern(/^\d{10}$/).required(),
        password: Joi.string().min(6).pattern(regularExpression).required(),
        organisation: Joi.string().required()
    });

    try {
        await schema.validateAsync(req.body);

        next();
        
    } catch (error) {
        return responses.errorResponse(req, res, error, 400);
    }
};

//add employee validator
const addEmployeeValidator = async (req, res, next) => {
  const schema = Joi.object({
    empId:Joi.string().required(),
    name: Joi.string().trim().pattern(/^[0-9a-zA-Z ,/-]+$/).required().messages({
        "string.pattern.base": `HTML tags & Special letters are not allowed!`,
    }),
    email: Joi.string().email().required(),
    department:Joi.string().required(),
    designation: Joi.string().required(),
    isOrganizer:Joi.boolean()
});

try {
    await schema.validateAsync(req.body);

    next();
    
} catch (error) {
    return responses.errorResponse(req, res, error, 400);
}
};

// SEND VIEW EMPLOYEE VALIDATOR
const viewEmployeeValidator = async (req, res, next) => {
    try {
      console.log(req.body);
      console.log(req.headers);
      const headerSchema = Joi.object({
        headers: Joi.object({
          authorization: Joi.required(),
        }).unknown(true),
      });
      // const bodySchema = Joi.object({
      //   name: Joi.string().required(),
      // });
  
      await headerSchema.validateAsync({ headers: req.headers });
      // await bodySchema.validateAsync(req.body);
  
      next();
    } catch (error) {
      console.log(error);
      return responses.errorResponse(req, res, error);
    }
  };

  //LSIT EMPLOYEE VALIDATOR
const listEmployesValidator = async (req, res, next) => {
    try {
      console.log(req.body);
      console.log(req.query);
      console.log(req.params);
  
      const headerSchema = Joi.object({
        headers: Joi.object({
          authorization: Joi.required(),
        }).unknown(true),
      });
      const bodySchema = Joi.object({
        searchKey: Joi.string()
          .trim()
          .pattern(/^[0-9a-zA-Z ,/-]+$/)
          .messages({
            "string.pattern.base": `HTML tags & Special letters are not allowed!`,
          }),
      });
      const paramsSchema = Joi.object({
        limit: Joi.number(),
        page: Joi.number(),
        order: Joi.number(),
      });
  
      await headerSchema.validateAsync({ headers: req.headers });
      await bodySchema.validateAsync(req.body);
      await paramsSchema.validateAsync(req.query);
  
      next();
    } catch (error) {
      console.log(error);
      return responses.errorResponse(req, res, error, 200);
    }
  };
  //VIEW EMPLOYEE VALIDATOR
  const viewSingleEmployeeValidator = async (req, res, next) => {
    try {
      console.log(req.body);
      console.log(req.params);
      const headerSchema = Joi.object({
        headers: Joi.object({
          authorization: Joi.required(),
        }).unknown(true),
      });
      const paramsSchema = Joi.object({
        id: Joi.string().trim().alphanum().required(),
      });
      await headerSchema.validateAsync({ headers: req.headers });
      await paramsSchema.validateAsync(req.params);
      next();
    } catch (error) {
      console.log(error);
      return responses.errorResponse(req, res, error, 200);
    }
  };

module.exports = {
    createEmployeeValidator,
    viewEmployeeValidator,
    viewSingleEmployeeValidator,
    listEmployesValidator,
    addEmployeeValidator
};
