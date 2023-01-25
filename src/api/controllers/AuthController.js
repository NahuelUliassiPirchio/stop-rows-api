const authService = require('../services/AuthService');

const login = async (req, res) => {
    const { user } = req;
    const token = await authService.generateToken(user);
    return res.status(200).json({ token, expires_in: token.expiresIn });
};

module.exports = {
    login
};
