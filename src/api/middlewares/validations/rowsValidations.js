const Joi = require('joi');

const createRowSchema = Joi.object({
    status: Joi.string().valid('open', 'closed').required(),
});

const updateRowSchema = Joi.object({
    customers: Joi.array().items(Joi.object({
        user: Joi.string(),
        date: Joi.date(),
    })),
    status: Joi.string().valid('open', 'closed'),
});

const validateRow = (req, res, next) => {
    const { error } = createRowSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validateRowUpdate = (req, res, next) => {
    const { error } = updateRowSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = {
    validateRow,
    validateRowUpdate,
};