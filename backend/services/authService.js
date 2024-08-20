const Employee = require('../models/userModel');
const authMiddleware = require('../middlewares/authMiddleware');
const commonHelper = require('../helpers/commonHelper')

const login = async (email, password, otp) => {
    const employee = await Employee.findOne({ email });
    if (!employee) {
        return null;
    }

    // Check OTP if provided
    if (otp) {
        if (employee.otp !== otp || employee.otpExpiration < new Date()) {
            return null;
        }

        // Clear OTP after successful verification
        employee.otp = null;
        employee.otpExpiration = null;
        await employee.save();
    }

    const validPassword = await commonHelper.comparePassword(password, employee.password);
    if (!validPassword) {
        return null;
    }

    // const token = jwt.sign({ _id: employee._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // return { token };
    const token = await authMiddleware.generateToken({
        _id: employee._id,
        name:employee.name,
    });
    return { 
        token,
        userData: {
            _id: employee._id,
            name: employee.name,
            email: employee.email,
          },
     };
};

module.exports = {
    login
};
