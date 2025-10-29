const mongoose = require('mongoose');
const { mongooseConfig } = require('./const');

( async () => {
    try{
        await mongoose.connect(mongooseConfig.dbUrl, {
            autoIndex: true, 
            dbName: mongooseConfig.dbName
        });
        console.log("Mongoose Connected Successfully !!!")
    } catch(error) {
        console.log("Unable to connect to mongoose")
        process.exit(1)
    }
})();