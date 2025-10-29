const jwt = require('jsonwebtoken');
const authSvc = require('../module/auth/auth.service');
const { appConfig } = require('../config/const');
const userSvc = require('../users/user.service');

const auth = (allowedUser = null) => {
    return async (req, res, next) => {
        try{
            let token = req.headers['authorization'] || null;

            if(!token){
                throw {
                    code: 404,
                    status: "Token Expected",
                    message: "Token was not found !!!"
                }
            }

            token = token.split(' ').pop()

            const sessionData = await authSvc.getMultipleRowByFilter({
                "accessToken.masked": token
            });

            if(!sessionData) {
                throw {
                    code: 404,
                    status: "Invalid Token",
                    message: "Token used is incorrect."
                }
            }

            const payload = jwt.verify(sessionData.accessToken.actual, appConfig.jwtToken);

            if(payload.type !== "Bearer"){
                throw {
                    code: 404,
                    status: "Invalid Access Token",
                    message: "Acutal Token Expected"
                }
            }

            const userDetail = await authSvc.getSingleRowByFilter({
                _id: payload.sub
            })

            if(!userDetail){
                throw {
                    code: 404,
                    status: "UserDetail not found.",
                    message: "UserDetail not found"
                }
            };

            //No condition because this is the simple note app.
            if(allowedUser === null) {
                req.loggedInUser = await userSvc.getPublicProfile(userDetail);
                next();
            } else {
                throw {
                    code: 404,
                    status: "Access Denied",
                    message: "Access Denied for this user"
                }
            }
        } catch (error){
            throw error
        }
    }
}

module.exports = auth;