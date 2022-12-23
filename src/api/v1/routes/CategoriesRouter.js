const { Router } = require('express');
const controller = require('../../controllers/CategoriesController');

const { validateCategory, validateCategoryUpdate } = require('../../middlewares/categoriesValidations');
const router = Router();

router.get('/', controller.getAllCategories);
router.get('/:id', controller.getCategoryById);
router.post('/', validateCategory, controller.addCategory);
router.put('/:id', validateCategoryUpdate, controller.updateCategory);
router.delete('/:id', controller.deleteCategory);

module.exports = router;