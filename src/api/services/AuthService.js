const { sign } = require('jsonwebtoken');
const config = require('../config');
const UsersService = require('../services/UsersService');

const generateToken = (user) => {
    const token = sign({ id: user.id, role: user.role }, config.jwt.accessSecret,
        {expiresIn: parseInt(config.jwt.expiresIn)});
    return { token, expiresIn: config.jwt.expiresIn };
};


const generateRefreshToken = async (user) => {
    const accessToken = generateToken(user);
    const refreshToken = sign({ id: user.id, role: user.role }, config.jwt.refreshSecret,
        {expiresIn: parseInt(config.jwt.refreshExpiresIn)});
    return {accessToken, refreshToken};
};

const createUser = async (user) => {
    const newUser = await UsersService.addUser(user);
    return newUser;
};

module.exports = {
    generateToken,
    generateRefreshToken,
    createUser,
};