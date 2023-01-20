const Joi = require('joi');

const shopSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(3).max(100).required(),
    address: Joi.string().min(3).max(100).required(),
    phone: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(30).required(),
    website: Joi.string().min(3).max(30).required(),
    logo: Joi.string().min(3).max(120).required(),
    owner: Joi.string().min(3).max(30).required(),
    coords: Joi.array().items(Joi.number()).required(),
    categories: Joi.array().items(Joi.string().min(3).max(30)),
});

const shopUpdateSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    description: Joi.string().min(3).max(100),
    address: Joi.string().min(3).max(100),
    phone: Joi.string().min(3).max(30),
    email: Joi.string().min(3).max(30),
    website: Joi.string().min(3).max(30),
    logo: Joi.string().min(3).max(30),
    owner: Joi.string().min(3).max(30),
    coords: Joi.array().items(Joi.number()).length(2),
    categories: Joi.array().items(Joi.string().min(3).max(30)),
});

const shopFilterAndPaginationSchema = Joi.object({
    search: Joi.string().max(30),
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
    status: Joi.string().valid('open', 'closed'),
    lat: Joi.number().when('lng', { is: Joi.exist(), then: Joi.required() }).min(-90).max(90),
    lng: Joi.number().min(-180).max(180),
});

const validateShop = (req, res, next) => {
    const { error } = shopSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validateShopUpdate = (req, res, next) => {
    const { error } = shopUpdateSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validateShopFilter = (req, res, next) => {
    const { error } = shopFilterAndPaginationSchema.validate(req.query);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = {
    validateShop,
    validateShopUpdate,
    validateShopFilter,
};