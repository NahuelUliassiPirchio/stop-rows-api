import UsersService from '../services/UsersService';
import { Response } from 'express';
import { AuthenticatedRequest } from '../../types/express';

const getProfile = async (req: AuthenticatedRequest, res: Response) => {
    const profile = await UsersService.getProfile(req.user);
    res.json(profile);
};

const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
    const profile = await UsersService.updateProfile(req.user, req.body);
    res.json(profile);
};

const deleteProfile = async (req: AuthenticatedRequest, res: Response) => {
    const profile = await UsersService.deleteProfile(req.user);
    res.json(profile);
};

const restoreProfile = async (req: AuthenticatedRequest, res: Response) => {
    const profile = await UsersService.restoreProfile(req.user);
    res.json(profile);
};

export default {
    getProfile,
    updateProfile,
    deleteProfile,
    restoreProfile,
};
