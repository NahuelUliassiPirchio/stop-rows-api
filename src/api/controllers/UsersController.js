const UsersService = require('../services/UsersService');

const getAllUsers = async (req, res, next) => {
    try{
        const users = await UsersService.getAllUsers();
        res.status(200).json(users);}
    catch(err){
        next(err);
    }
};

const getUserById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await UsersService.getUserById(id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

const createNewUser = async (req, res, next) => {
    const { body } = req;
    try {
        const newUser = await UsersService.addUser(body);
        res.status(201).json(newUser);
    } catch (err) {
        next(err);
    }
};

const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const updatedUser = await UsersService.updateUser(id, body);
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedUser = await UsersService.deleteUser(id);
        res.status(200).json(deletedUser);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser,
};