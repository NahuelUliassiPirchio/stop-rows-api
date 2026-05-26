import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../types/express';
import Shop from '../database/models/Shop';

const ownsShop = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { shopId } = req.params;
    try {
        const shop = await Shop.findById(shopId);
        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }
        if (shop.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You do not own this shop' });
        }
        next();
    } catch (err) {
        next(err);
    }
};

export default ownsShop;
