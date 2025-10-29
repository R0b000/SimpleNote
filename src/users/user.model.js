const mongoose = require('mongoose');
const { STATUS } = require('../config/const');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true, 
        unique: true, 
    }, 
    email: {
        type: String,
        required: true, 
        unique: true, 
    },
    password: {
        type: String, 
        required: true,
    },
    status: {
        type: String,
        default: STATUS.ACTIVE
    }
}, {
    autoCreate: true, 
    autoIndex: true, 
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;