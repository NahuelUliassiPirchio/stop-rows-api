const { Router } = require('express');
const controller = require('../../controllers/ShopsController');

const { validateShop, validateShopUpdate, validateShopFilter } = require('../../middlewares/validations/shopsValidations');
const router = Router();

router.get('/', validateShopFilter, controller.getAllShops);
router.get('/:id', controller.getShopById);
router.post('/', validateShop, controller.addShop);
router.put('/:id', validateShopUpdate, controller.updateShop);
router.delete('/:id', controller.deleteShop);

module.exports = router;
