import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { UserRolesEnum } from '../../../types/User';

const LoginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
});

const signUpRoles = Object.values(UserRolesEnum).filter(role => role !== UserRolesEnum.ADMIN);

const signUpSchema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    username: Joi.string().min(3).max(30).required(),
    role: Joi.string().valid(...signUpRoles).required(),
    password: Joi.string().min(6).max(30),
});

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { error } = LoginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
};

const validateSignUp = (req: Request, res: Response, next: NextFunction) => {
    const { error } = signUpSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
};

export { validateLogin, validateSignUp };
