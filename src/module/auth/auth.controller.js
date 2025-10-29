const authSvc = require("./auth.service")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { appConfig } = require("../../config/const");
const { randomNumberGeneration } = require("../../utility/helper");

class AuthController {
    authRegisterUser = async (req, res, next) => {
        try {
            const data = await authSvc.transformRegisterUser(req);
            const response = await authSvc.registerUser(data);

            res.json({
                data: response,
                code: 200,
                status: "Registration Successful",
                message: "Your account has been created.",
                options: null
            })
        } catch (error) {
            next(error)
        }
    }

    authLogin = async (req, res, next) => {
        try{
            const {email, password} = req.body;

            const response = await authSvc.getSingleRowByFilter({
                email: email
            });

            if(!response) {
                throw {
                    status:"Invalid data",
                    code: 404,
                    message: "Invalid email"
                }
            }

            if(!bcrypt.compare(password, response.password)) {
               throw {
                    status:"Invalid data",
                    code: 404,
                    message: "Invalid password"
               }
            }

            //jwt
            const accessToken = jwt.sign({sub: response._id, type: "Bearer"}, appConfig.jwtToken, { expiresIn: "1hr" });
            const refreshToken = jwt.sign({sub: response._id, type: 'Refresh'}, appConfig.jwtToken, { expiresIn: "2hr" });

            const SessionData = {
                user: response._id,
                accessToken: {
                    actual: accessToken,
                    masked: randomNumberGeneration(150)
                },
                refreshToken: {
                    actual: refreshToken,
                    masked: randomNumberGeneration(150)
                },
                sessionUserData: JSON.stringify({
                    device: "web"
                })
            }
            
            const session = await authSvc.storeSession(SessionData)

            next({
                data: {
                    accessToken: session.accessToken.masked,
                    refreshToken: session.refreshToken.masked
                },
                status: "Login Successfull",
                code: 200,
                message: "Welcome to simple note app",
                options: null,
            })
        } catch (error) {
            throw error
        }
    }
}

const authCtrl = new AuthController;

module.exports = authCtrl