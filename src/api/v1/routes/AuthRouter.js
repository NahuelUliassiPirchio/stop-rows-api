const { Router } = require('express');
const passport = require('passport');
const controller = require('../../controllers/AuthController');

const jwt = require('jsonwebtoken');
const router = Router();
const config = require('../../config');
const { validateSignUp, validateLogin } = require('../../middlewares/validations/authValidations');

router.post('/login', validateLogin, passport.authenticate('local', {session: false}), controller.login);
router.post('/refresh', passport.authenticate('jwt-refresh', {session: false}), controller.refresh);
router.post('/signup', validateSignUp, controller.signup);

router.post('/verify', async (req, res) => {
    const { token } = req.body;
    try {
        const decoded = jwt.verify(token, config.jwt.accessSecret);
        return res.status(200).json({ decoded });
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
});

module.exports = router;