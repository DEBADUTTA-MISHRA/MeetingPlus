const Employee = require('../models/userModel');
const otpGenerator = require('otp-generator');
const { sendOtpEmail } = require('../services/emailService');
const responses = require('../helpers/response');
const messages = require('../constants/constantMessages');

const generateOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const employee = await Employee.findOne({ email });

        if (!employee) {
            return responses.failResponse(req, res, null, messages.invalidCredentials, 401);
        }

        const otp = otpGenerator.generate(6, { digits: true, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        const otpExpiration = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

        employee.otp = otp;
        employee.otpExpiration = otpExpiration;
        await employee.save();

        await sendOtpEmail(email, otp);
        return responses.successResponse(req, res, null, messages.otpSentSuccess, 200);
    } catch (error) {
        return responses.errorResponse(req, res, error);
    }
};

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        console.log("req.body----->",req.body);
        console.log("email--->",email);
        const employee = await Employee.findOne({ email });

        if (!employee || employee.otp !== otp || employee.otpExpiration < new Date()) {
            return responses.failResponse(req, res, null, messages.invalidCredentials, 401);
        }

        // Clear OTP after successful verification
        employee.otp = null;
        employee.otpExpiration = null;
        await employee.save();

        return responses.successResponse(req, res, null, 'OTP verified successfully', 200);
    } catch (error) {
        return responses.errorResponse(req, res, error);
    }
};

module.exports = {
    generateOtp,
    verifyOtp
};
