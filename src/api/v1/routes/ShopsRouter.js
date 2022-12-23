const { Router } = require('express');
const controller = require('../../controllers/ShopsController');

const { validateShop, validateShopUpdate } = require('../../middlewares/validations/shopsValidations');
const router = Router();

router.get('/', controller.getAllShops);
router.get('/:id', controller.getShopById);
router.post('/', validateShop, controller.addShop);
router.put('/:id', validateShopUpdate, controller.updateShop);
router.delete('/:id', controller.deleteShop);

module.exports = router;
