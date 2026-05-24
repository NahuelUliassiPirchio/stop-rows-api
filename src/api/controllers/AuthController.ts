import authService from '../services/AuthService';
import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../types/express';

const login = async (req: AuthenticatedRequest, res: Response) => {
    const token = await authService.generateRefreshToken(req.user);
    return res.status(200).json(token);
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    try {
        const user = await authService.createUser(body);
        const token = await authService.generateRefreshToken(user);
        return res.status(200).json(token);
    } catch (error) {
        next(error);
    }
};

const refresh = (req: AuthenticatedRequest, res: Response) => {
    const token = authService.generateToken(req.user);
    return res.status(200).json(token);
};

export default {
    login,
    signup,
    refresh
};
