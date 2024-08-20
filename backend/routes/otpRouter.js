const express = require('express');
const router = express.Router();
const otpController = require('../controllers/otpController');

router.post('/generate', otpController.generateOtp);
router.post('/verify', otpController.verifyOtp);

module.exports = router;
