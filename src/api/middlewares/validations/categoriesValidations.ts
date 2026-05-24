import Joi from 'joi';
import { Request, Response, NextFunction} from 'express';

const categorySchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
});

const categoryUpdateSchema = Joi.object({
    name: Joi.string().min(3).max(30),
});

const validateCategory = (req: Request, res: Response, next: NextFunction) => {
    const { error } = categorySchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validateCategoryUpdate = (req: Request, res: Response, next: NextFunction) => {
    const { error } = categoryUpdateSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

export default {
    validateCategory,
    validateCategoryUpdate,
};