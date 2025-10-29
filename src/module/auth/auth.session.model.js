const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    accessToken: {
        actual: String,
        masked: String,
    },
    refreshToken: {
        actual: String, 
        masked: String,
    },
    sessionUserData: String,
}, {
    timestamps: true, 
    autoCreate: true,
});

const SessionModel = new mongoose.model("Session", SessionSchema);

module.exports = SessionModel