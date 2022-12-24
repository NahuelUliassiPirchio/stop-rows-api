const jwt = require('jsonwebtoken');
const config = require('../config');

const generateToken = async (user) => {
    const token = await jwt.sign({ id: user.id, role: user.role }, config.jwt.secret,
        {expiresIn: parseInt(config.jwt.expiresIn)});
    return token;
};

module.exports = {
    generateToken
};