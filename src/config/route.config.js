const authRouter = require('../module/auth/auth.route');
const noteRoute = require('../module/note/note.route');

const route = require('express').Router();

// auth
route.use('/auth', authRouter)

// note
route.use('/', noteRoute)

module.exports = route;