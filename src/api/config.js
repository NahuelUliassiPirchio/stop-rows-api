require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    db: {
        mongodbUri: process.env.MONGO_DB_URI,
    },
    auth: {
        secret: process.env.AUTH_SECRET,
        saltRounds: process.env.AUTH_SALT_ROUNDS,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
};