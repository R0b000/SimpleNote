const Joi = require("joi");

const registerValidationDTO = Joi.object({
    username: Joi.string().min(2).max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[\W_]).{8,25}$/)
})

module.exports = {
    registerValidationDTO
}