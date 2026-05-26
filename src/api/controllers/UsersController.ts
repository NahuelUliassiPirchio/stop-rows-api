import UsersService from '../services/UsersService';
import { Request, Response, NextFunction } from 'express';

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const users = await UsersService.getAllUsers();
        res.status(200).json(users);}
    catch(err){
        next(err);
    }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const user = await UsersService.getUserById(id as string);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

const createNewUser = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    try {
        const newUser = await UsersService.addUser(body);
        res.status(201).json(newUser);
    } catch (err) {
        next(err);
    }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const updatedUser = await UsersService.updateUser(id as string, body);
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const deletedUser = await UsersService.deleteUser(id as string);
        res.status(200).json(deletedUser);
    } catch (err) {
        next(err);
    }
};

export default {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser,
};