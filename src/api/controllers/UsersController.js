const UsersService = require('../services/UsersService');

const getAllUsers = async (req, res) => {
    const users = await UsersService.getAllUsers();
    res.status(200).json(users);
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await UsersService.getUserById(id);
    res.status(200).json(user);
};

const createNewUser = async (req, res) => {
    const { body } = req;
    const newUser = await UsersService.addUser(body);
    res.status(201).json(newUser);
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const updatedUser = await UsersService.updateUser(id, body);
    res.status(200).json(updatedUser);
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const deletedUser = await UsersService.deleteUser(id);
    res.status(200).json(deletedUser);
};

module.exports = {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser,
};