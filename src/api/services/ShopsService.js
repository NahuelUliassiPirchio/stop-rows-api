const Shop = require('../database/models/Shop');
const {getUserById} = require('./UsersService');

const ShopsService = {
    getAllShops: async (query) => {
        const search = query.search || '';
        const limit = query.limit || 10;
        const page = query.page || 1;
        const status = query.status === 'open' ? true : query.status === 'closed' ? false : undefined;
        const lat = query.lat;
        const lng = query.lng;
        const location = (lat && lng) ? {
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [lng, lat],
                    },
                    $maxDistance: 10000,
                },
            },
        } : {};
        
        const shops = await Shop.find(
            {
                name: {$regex: search, $options: 'i'},
                'row.status': status,
                ...location,
            },
            null,
            {limit: parseInt(limit), skip: (page - 1) * limit},
        );
        
        const totalShops = await Shop.find(
            {
                name: {$regex: search, $options: 'i'},
                'row.status': status,
                ...location,
            },
        ).countDocuments();
        
        return {
            data: shops,
            total: totalShops,
            totalPages: Math.ceil(totalShops / limit),
        };
    },
    getShopById: async (id) => {
        const shop = await Shop.findById(id);
        if(shop === null) throw new Error('Shop not found');
        return shop;
    },
    addShop: async (shop) => {
        const user = await getUserById(shop.owner);
        if(user === null) throw new Error('User not found');

        shop.location = {
            type: 'Point',
            coordinates: shop.coords,
        };
        const newShop = await Shop.create(shop);
        user.shops.push(newShop._id);
        await user.save();
        return newShop;
    },
    updateShop: async (id, shop) => {
        if (shop.coords) {
            shop.location = {
                type: 'Point',
                coordinates: shop.coords,
            };
        }
        const updatedShop = await Shop.findByIdAndUpdate(id, shop, {new: true});
        return updatedShop;
    },
    deleteShop: async (id) => {
        const deletedShop = await Shop.findByIdAndDelete(id);
        return deletedShop;
    },
};

module.exports = ShopsService;