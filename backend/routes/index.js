const express = require('express');
const router = express.Router();
const employeeRouter = require('./employeeRouter');
const authRouter = require('./authRouter');
const otpRouter = require('./otpRouter')

router.use('/v1/employee', employeeRouter);
router.use('/v1/auth', authRouter);
router.use('/v1/otp', otpRouter);

module.exports = router;
