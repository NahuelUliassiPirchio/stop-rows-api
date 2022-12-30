const UsersService = require('../services/UsersService');

const getProfile = async (req, res) => {
    const { user } = req;
    const profile = await UsersService.getProfile(user);
    res.json(profile);
};

const updateProfile = async (req, res) => {
    const { user } = req;
    const { body } = req;
    const profile = await UsersService.updateProfile(user, body);
    res.json(profile);
};

const deleteProfile = async (req, res) => {
    const { user } = req;
    const profile = await UsersService.deleteProfile(user);
    res.json(profile);
};

const restoreProfile = async (req, res) => {
    const { user } = req;
    const profile = await UsersService.restoreProfile(user);
    res.json(profile);
};

module.exports = {
    getProfile,
    updateProfile,
    deleteProfile,
    restoreProfile,
};