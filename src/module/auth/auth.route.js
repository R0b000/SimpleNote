const validation = require('../../middleware/validation.middleware');
const authCtrl = require('./auth.controller');
const { registerValidationDTO } = require('./auth.validation');

const authRouter = require('express').Router();

authRouter.post("/register", validation(registerValidationDTO), authCtrl.authRegisterUser)
authRouter.post("/login", authCtrl.authLogin);

module.exports = authRouter