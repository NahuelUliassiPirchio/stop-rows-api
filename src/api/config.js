require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    db: {
        mongodbUri: process.env.MONGO_DB_URI,
    },
    auth: {
        secret: process.env.AUTH_SECRET,
    },
};