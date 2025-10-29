const express = require('express');
const route = require('./route.config');
const helmet = require('helmet');
const cors = require('cors');
const { default: rateLimit } = require('express-rate-limit');
const { appConfig } = require('./const');
require('./mongoose.config'); // mongoose initializatioin should always be at the top before initialization of others app required things. 

const app = express();

app.use(helmet());

app.use(cors({
    origin: [appConfig.origin, 'http://localhost:5173']
}))

app.use(rateLimit({
    windowMs: 60*1000,
    limit: 100
}))

app.use(express.json({
    limit: '2mb'
})),

app.use(express.urlencoded({
    limit: "5mb",
    extended: true,
}))

app.use('', route);

// for handling non-existing route
app.use((req, res, next) => {
    res.status(404).json({
        data: null,
        status: "Invalid Url",
        message: "Entered URL is invalid",
        options: null,
    })
})

// middleware for handling the error
app.use((error, req, res, next) => {
    let data = error.data;
    let code = error.code;
    let message = error.message;
    let status = error.status;
    let options = error.options

    res.status(code || 500).json({
        data: data,
        status: status || "Server Down",
        message: message || "Try again",
        options: options || null,
    })
})

module.exports = app;