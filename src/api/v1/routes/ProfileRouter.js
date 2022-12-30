const { Router } = require('express');
const controller = require('../../controllers/ProfileController');

const router = Router();

router.get('/', controller.getProfile);
router.put('/', controller.updateProfile);
router.delete('/', controller.deleteProfile);
router.post('/restore', controller.restoreProfile);

module.exports = router;