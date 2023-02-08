const Joi = require('joi');
const roles = require('../../database/models/UserRolesEnum');

const LoginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
});

const signUpRoles = Object.values(roles).filter((role) => role !== roles.ADMIN);

const signUpSchema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    username: Joi.string().min(3).max(30).required(),
    role: Joi.string().valid(...Object.values(signUpRoles)).required(),
    password: Joi.string().min(6).max(30),
});

const validateLogin = (req, res, next) => {
    const { error } = LoginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
};

const validateSignUp = (req, res, next) => {
    const { error } = signUpSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
};

module.exports = {
    validateLogin,
    validateSignUp,
};
