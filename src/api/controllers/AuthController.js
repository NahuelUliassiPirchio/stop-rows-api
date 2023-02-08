const authService = require('../services/AuthService');

const login = async (req, res) => {
    const { user } = req;
    const token = await authService.generateRefreshToken(user);
    return res.status(200).json(token);
};

const signup = async (req, res, next) => {
    const { body } = req;
    try {
        const user = await authService.createUser(body);
        const token = await authService.generateRefreshToken(user);
        return res.status(200).json(token);
    } catch (error) {
        next(error);
    }
};

const refresh = (req, res) => {
    const { user } = req;
    const token = authService.generateToken(user);
    return res.status(200).json(token);
};

module.exports = {
    login,
    signup,
    refresh
};
