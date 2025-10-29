const userModel = require("../../users/user.model");
const bcrypt = require("bcryptjs");
const SessionModel = require("./auth.session.model");

class AuthService {
    registerUser = async (data) => {
        try {
            const response = new userModel(data);
            return await response.save();
        } catch(error) {
            if(error.errorResponse.code === 11000){
                throw({
                    data: error.errorResponse.errmsg,
                    code: 404,
                    status: "Failed Registering the user.",
                    message: "Registerating failed due to some reason."
                })
            }
        }
    }

    transformRegisterUser = async (req) => {
        try{
            const data = req.body;
            data.password = await bcrypt.hash(data.password, 10);
            return data;
        } catch(error){
            throw(error)
        }
    }

    getSingleRowByFilter = async (data) => {
        try{
            const response = await userModel.findOne(data)
            return response;
        } catch(error) {
            throw error
        }
    }

    storeSession = async (data) => {
        try{
            const response = new SessionModel(data);
            return await response.save()
        } catch(error) {
            throw error;
        }
    }

    getMultipleRowByFilter = async (data) => {
        try {
            const response = await SessionModel.findOne(data);
            return response;
        } catch(error) {
            throw error
        }
    }
};

const authSvc = new AuthService;

module.exports = authSvc