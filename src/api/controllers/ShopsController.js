const ShopsService = require('../services/ShopsService');

const ShopsController = {
    getAllShops: async (req, res, next) => {
        try {
            const shops = await ShopsService.getAllShops();
            res.status(200).json(shops);
        } catch (err) {
            next(err);
        }
    },
    getShopById: async (req, res, next) => {
        const { id } = req.params;
        try {
            const shop = await ShopsService.getShopById(id);
            res.status(200).json(shop);
        } catch (err) {
            next(err);
        }
    },
    addShop: async (req, res, next) => {
        const { body } = req;
        try {
            const shop = await ShopsService.addShop(body);
            res.status(201).json(shop);
        } catch (err) {
            next(err);
        }
    },
    updateShop: async (req, res, next) => {
        const { id } = req.params;
        const { body } = req;
        try {
            const shop = await ShopsService.updateShop(id, body);
            res.status(200).json(shop);
        } catch (err) {
            next(err);
        }
    },
    deleteShop: async (req, res, next) => {
        const { id } = req.params;
        try {
            const shop = await ShopsService.deleteShop(id);
            res.status(200).json(shop);
        } catch (err) {
            next(err);
        }
    }
};

module.exports = ShopsController;