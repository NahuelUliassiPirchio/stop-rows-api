import { IShopDocument, IShopQuery, ShopInput } from '../../types/Shop';

import Shop from '../database/models/Shop';
import UsersService from './UsersService';

const ShopsService = {
    getAllShops: async (query: IShopQuery) => {
        const search = query.search || '';
        const limit = query.limit || 10;
        const page = query.page || 1;
        const statusExists = query.status === 'closed' ? {$exists: false} : query.status === 'open' ? {$exists: true} : undefined;
        const category = query.category || query.categories;
        const categoryFilter = category ? {categories: category} : {};
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
                row: statusExists,
                ...categoryFilter,
                ...location,
            },
            null,
            {limit: limit, skip: (page - 1) * limit},
        );

        const totalShops = await Shop.find({
            name: {$regex: search, $options: 'i'},
            row: statusExists,
            ...categoryFilter,
            ...location,
        });
        const totalShopsCount = totalShops.length;


        return {
            data: shops,
            total: totalShopsCount,
            totalPages: Math.ceil(totalShopsCount / limit),
        };
    },
    getShopById: async (id: string) => {
        const shop = await Shop.findById(id);
        if(shop === null) throw new Error('Shop not found');
        return shop;
    },
    addShop: async (shop: ShopInput, userId: string): Promise<IShopDocument> => {
        const user = await UsersService.getUserById(userId);
        const newShop = await Shop.create({
            ...shop,
            owner: user._id,
            location: { type: 'Point', coordinates: shop.location.coordinates },
        });
        user.shops.push(newShop._id);
        await user.save();
        return newShop;
    },
    updateShop: async (id: string, shop: Partial<ShopInput>): Promise<IShopDocument | null> => {
        if (shop.location?.coordinates) {
            shop.location = { type: 'Point', coordinates: shop.location.coordinates };
        }
        return Shop.findByIdAndUpdate(id, shop, { new: true });
    },
    deleteShop: async (id: string): Promise<IShopDocument | null> => {
        return Shop.findByIdAndDelete(id);
    },
};

export default ShopsService;