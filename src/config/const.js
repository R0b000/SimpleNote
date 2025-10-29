require('dotenv').config(); //Dont forget .config() else, the code will not work at all. 

const mongooseConfig = {
    dbUrl: process.env.MONGOOSE_URL,
    dbName: process.env.MONGOOSE_DB
}

const STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive'
}

const appConfig = {
    jwtToken: process.env.JWTSECRET,
    origin: process.env.CLIENT_ORIGIN
}

module.exports = {
    mongooseConfig,
    STATUS,
    appConfig
}