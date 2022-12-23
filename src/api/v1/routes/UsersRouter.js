const { Router } = require('express');
const controller = require('../../controllers/UsersController');

const { validateUser, validateUserUpdate } = require('../../middlewares/validations/usersValidations');
const router = Router();

router.get('/', controller.getAllUsers);
router.get('/:id', controller.getUserById);
router.post('/', validateUser, controller.createNewUser);
router.put('/:id', validateUserUpdate, controller.updateUser);
router.delete('/:id', controller.deleteUser);

module.exports = router;
