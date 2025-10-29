const auth = require('../../middleware/auth.middleware');
const noteCtrl = require('./note.controller');

const noteRoute = require('express').Router();

noteRoute.get('/me', auth(), noteCtrl.noteMe);
noteRoute.post('/create', auth(), noteCtrl.createNote)
noteRoute.put('/update/:id', auth(), noteCtrl.updateNote);
noteRoute.get('/list', auth(), noteCtrl.noteList);
noteRoute.delete('/delete/:id', auth(), noteCtrl.deleteNote);
noteRoute.get('/list/:id', auth(), noteCtrl.getSingleNoteInfo)

module.exports = noteRoute