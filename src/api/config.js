require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    db: {
        mongodbUri: process.env.NODE_ENV === 'test' ? process.env.MONGODB_TEST_URI : process.env.MONGODB_URI,
    },
    auth: {
        secret: process.env.AUTH_SECRET,
        saltRounds: process.env.AUTH_SALT_ROUNDS,
    },
    jwt: {
        accessSecret: process.env.JWT_SECRET,
        refreshSecret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    },
    rateLimit: {
        windowMs: process.env.RATE_LIMIT_WINDOW_MS,
        max: process.env.NODE_ENV === 'test' ? 0 : process.env.RATE_LIMIT_MAX,
    },
};