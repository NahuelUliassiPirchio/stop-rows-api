const Shop = require('../database/models/Shop');
const {getUserById} = require('./UsersService');

const ShopsService = {
    getAllShops: async () => {
        const shops = await Shop.find().populate('owner');
        return shops;
    },
    getShopById: async (id) => {
        const shop = await Shop.findById(id);
        return shop;
    },
    addShop: async (shop) => {
        const user = await getUserById(shop.owner);
        if(user === null) throw new Error('User not found');
        const newShop = await Shop.create(shop);
        user.shops.push(newShop._id);
        await user.save();
        return newShop;
    },
    updateShop: async (id, shop) => {
        const updatedShop = await Shop.findByIdAndUpdate(id, shop, {new: true});
        return updatedShop;
    },
    deleteShop: async (id) => {
        const deletedShop = await Shop.findByIdAndDelete(id);
        return deletedShop;
    }
};

module.exports = ShopsService;