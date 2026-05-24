import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

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

const validateRow = (req: Request, res: Response, next: NextFunction) => {
    const { error } = createRowSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validateRowUpdate = (req: Request, res: Response, next: NextFunction) => {
    const { error } = updateRowSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

export default {
    validateRow,
    validateRowUpdate,
};