const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    data: {
        type: Date,
        default: Date.now()
    },
    title: {
        type: String, 
        min: 3,
        default: null
    },
    body: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
    autoCreate: true,
});

const NoteModel = new mongoose.model("Note", NoteSchema);

module.exports = NoteModel;