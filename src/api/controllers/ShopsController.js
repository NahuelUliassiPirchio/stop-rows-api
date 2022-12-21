const ShopsService = require('../services/ShopsService');

const ShopsController = {
    getAllShops: async (req, res) => {
        const shops = await ShopsService.getAllShops();
        res.status(200).json(shops);
    },
    getShopById: async (req, res) => {
        const { id } = req.params;
        const shop = await ShopsService.getShopById(id);
        res.status(200).json(shop);
    },
    addShop: async (req, res) => {
        const { body } = req;
        const shop = await ShopsService.addShop(body);
        res.status(201).json(shop);
    },
    updateShop: async (req, res) => {
        const { id } = req.params;
        const { body } = req;
        const shop = await ShopsService.updateShop(id, body);
        res.status(200).json(shop);
    },
    deleteShop: async (req, res) => {
        const { id } = req.params;
        const shop = await ShopsService.deleteShop(id);
        res.status(200).json(shop);
    }
};

module.exports = ShopsController;