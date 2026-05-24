import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../types/express';
import Shop from '../database/models/Shop';

const ownsShop = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { shopId } = req.params;
    const shop = await Shop.findOne({ _id: shopId, owner: req.user._id });
    if (!shop) {
        return res.status(403).json({ message: 'You do not own this shop' });
    }
    next();
};

export default ownsShop;
