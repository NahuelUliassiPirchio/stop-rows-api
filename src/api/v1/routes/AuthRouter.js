const { Router } = require('express');
const passport = require('passport');
const controller = require('../../controllers/AuthController');

const jwt = require('jsonwebtoken');
const router = Router();
const config = require('../../config');
router.post('/login', passport.authenticate('local', {session: false}), controller.login);
//router.post('/register', controller.register);

router.post('/verify', async (req, res) => {
    const { token } = req.body;
    try {
        const decoded = jwt.verify(token, config.jwt.secret);
        return res.status(200).json({ decoded });
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
});

module.exports = router;