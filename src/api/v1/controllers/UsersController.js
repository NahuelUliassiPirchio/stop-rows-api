const UsersServiceClass = require('../services/UsersService');
const UsersService = new UsersServiceClass();

const getAllUsers = async (req, res) => {
    const users = await UsersService.getAllUsers();
    res.status(200).json(users);
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await UsersService.getUserById(parseInt(id));
    if(!user) return res.status(404).json({ message: 'User not found' });
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
    if(!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const deletedUser = await UsersService.deleteUser(parseInt(id));
    if(!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(deletedUser);
};

module.exports = {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser,
};