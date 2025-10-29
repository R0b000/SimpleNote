const http = require('http');
const app = require('./src/config/express.config');
require('dotenv').config();

const httpServer = http.createServer(app);

const URL = process.env.HOST || `127.0.0.1`;
const PORT = process.env.PORT || 443;

if (process.env.NODE_ENV === 'production') {
    console.log('🚀 Running in production mode');
    app.set('trust proxy', 1); // important when behind proxy (Render, Vercel, etc.)

    // Optional: enable compression for faster responses
    const compression = require('compression');
    app.use(compression());
} else {
    console.log('🧑‍💻 Running in development mode');
}

httpServer.listen(PORT, URL, (error) => {
    if(!error){
        console.log(`http://${URL}:${PORT}`);       // Here it should always be http not https or there will be error loading the website
    }
})