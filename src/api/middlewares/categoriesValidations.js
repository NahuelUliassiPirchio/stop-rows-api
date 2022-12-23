const Joi = require('joi');

const categorySchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
});

const categoryUpdateSchema = Joi.object({
    name: Joi.string().min(3).max(30),
});

const validateCategory = (req, res, next) => {
    const { error } = categorySchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validateCategoryUpdate = (req, res, next) => {
    const { error } = categoryUpdateSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = {
    validateCategory,
    validateCategoryUpdate,
};