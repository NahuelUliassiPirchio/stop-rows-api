const Shop = require('../database/models/Shop');

const ownsShop = async (req, res, next) => {
    const { shopId } = req.params;
    const { id: userId } = req.user;
    const shop = await Shop.findOne({ where: { id: shopId, userId } });
    if (!shop) {
        return res.status(403).json({ message: 'You do not own this shop' });
    }
    next();
};

module.exports = ownsShop;