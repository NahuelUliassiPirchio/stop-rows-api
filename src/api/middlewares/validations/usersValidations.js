const Joi = require('joi');
const roles = require('../../database/models/UserRolesEnum');

const userSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).max(30).required(),
    role: Joi.string().valid(...Object.values(roles)).required(),
});

const userUpdateSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    username: Joi.string().min(3).max(30),
    password: Joi.string().min(6).max(30),
    role: Joi.string().valid(...Object.values(roles)),
});

const validateUser = (req, res, next) => {
    const schemaValidationResult = userSchema.validate(req.body);
    const { error } = schemaValidationResult;
    if(error) return res.status(400).json({ message: error.details[0].message });
    next();
};

const validateUserUpdate = (req, res, next) => {
    const { error } = userUpdateSchema.validate(req.body);
    if(error) return res.status(400).json({ message: error.details[0].message });
    next();
};

module.exports = {
    validateUser,
    validateUserUpdate,
};