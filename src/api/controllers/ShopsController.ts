import ShopsService from '../services/ShopsService';
import { IShopQuery } from '../../types/Shop';
import { Request, Response, NextFunction } from 'express';

const ShopsController = {
    getAllShops: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const shops = await ShopsService.getAllShops(req.query as unknown as IShopQuery);
            res.status(200).json(shops);
        } catch (err) {
            next(err);
        }
    },
    getShopById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const shop = await ShopsService.getShopById(req.params.id);
            res.status(200).json(shop);
        } catch (err) {
            next(err);
        }
    },
    addShop: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const shop = await ShopsService.addShop(req.body, req.user!._id.toString());
            res.status(201).json(shop);
        } catch (err) {
            next(err);
        }
    },
    updateShop: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const shop = await ShopsService.updateShop(req.params.id, req.body);
            res.status(200).json(shop);
        } catch (err) {
            next(err);
        }
    },
    deleteShop: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const shop = await ShopsService.deleteShop(req.params.id);
            res.status(200).json(shop);
        } catch (err) {
            next(err);
        }
    },
};

export default ShopsController;
