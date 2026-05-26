import { sign } from 'jsonwebtoken';
import type { StringValue } from 'ms';
import config from '../config';
import UsersService from './UsersService';
import { IUserDocument, UserInput } from '../../types/User';

const generateToken = (user: IUserDocument) => {
    const secret = config.jwt.accessSecret;
    if (!secret) throw new Error('JWT_SECRET is not defined');
    const accessToken = sign(
        { id: user._id, role: user.role },
        secret,
        { expiresIn: (config.jwt.expiresIn || '3600') as StringValue }
    );
    return { accessToken, expiresIn: config.jwt.expiresIn };
};

const generateRefreshToken = async (user: IUserDocument) => {
    const secret = config.jwt.refreshSecret;
    if (!secret) throw new Error('JWT_REFRESH_SECRET is not defined');
    const accessToken = generateToken(user);
    const refreshToken = sign(
        { id: user._id, role: user.role },
        secret,
        { expiresIn: (config.jwt.refreshExpiresIn || '7d') as StringValue }
    );
    return { accessToken, refreshToken };
};

const createUser = async (user: UserInput) => {
    return UsersService.addUser(user);
};

export default {
    generateToken,
    generateRefreshToken,
    createUser,
};
