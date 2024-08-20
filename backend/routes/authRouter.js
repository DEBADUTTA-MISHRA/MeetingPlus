const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validator = require('../validator/authValidator');

router.post('/login', validator.loginValidator, authController.login);

module.exports = router;
