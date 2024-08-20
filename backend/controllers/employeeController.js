const employeeService = require('../services/employeeService');
const responses = require('../helpers/response');
const messages = require('../constants/constantMessages');

const createEmployee = async (req, res) => {
    try {
        const result = await employeeService.createEmployee(req.body);
        if (result?.isDuplicateEmail) {
            return responses.failResponse(req, res, null, messages.duplicateEmail, 200);
        }
        return responses.successResponse(req, res, result, messages.createdSuccess, 201);
    } catch (error) {
        return responses.errorResponse(req, res, error);
    }
};

const addEmployee = async (req, res)=>{
  try {
    const result = await employeeService.addEmployee(req.body);
    console.log("req.body",req.body);
    if (result?.isDuplicateEmail) {
        return responses.failResponse(req, res, null, messages.duplicateEmail, 200);
    }
    return responses.successResponse(req, res, result, messages.createdSuccess, 201);
} catch (error) {
    return responses.errorResponse(req, res, error);
}
};

const listEmployee = async (req, res) => {
    try {
      const result = await employeeService.listEmployee(req.body, req.query);
      console.log(result);
      if (result.totalCount == 0) {
        return responses.failResponse(
          req,
          res,
          null,
          messages.recordsNotFound,
          200
        );
      }
      return responses.successResponse(
        req,
        res,
        result,
        messages.recordsFound,
        200
      );
    } catch (error) {
      console.log(error);
      return responses.errorResponse(req, res, error);
    }
  };
  
  const viewSingleEmployee = async (req, res) => {
    try {
      const result = await employeeService.viewSingleEmployee(req.params.id);
      console.log("viewSingleEmploye result", result);
      if (!result) {
        return responses.failResponse(
          req,
          res,
          null,
          messages.recordsNotFound,
          200
        );
      }
      return responses.successResponse(
        req,
        res,
        result,
        messages.recordsFound,
        200
      );
    } catch (error) {
      console.log(error);
      return responses.errorResponse(req, res, error);
    }
  };
  

module.exports = {
    createEmployee,
    listEmployee,
    viewSingleEmployee,
    addEmployee
};
