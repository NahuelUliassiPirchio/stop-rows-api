import bcrypt from 'bcryptjs';
import config from '../api/config';

const saltRounds = parseInt( config.auth.saltRounds || '10');

const hashPassword = (password: string): Promise<string> => {
    return bcrypt.hash(password, saltRounds);
};

const comparePassword = (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};

export {
    hashPassword,
    comparePassword
};