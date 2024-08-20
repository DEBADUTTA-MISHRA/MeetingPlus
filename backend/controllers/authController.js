const authService = require('../services/authService');
const responses = require('../helpers/response');
const messages = require('../constants/constantMessages');

const login = async (req, res) => {
    try {
        const { email, password, otp } = req.body;
        const result = await authService.login(email, password, otp);
        if (!result) {
            return responses.failResponse(req, res, null, messages.invalidCredentials, 401);
        }
        return responses.successResponse(req, res, result, messages.loginSuccess, 200);
    } catch (error) {
        return responses.errorResponse(req, res, error);
    }
};

module.exports = {
    login
};
