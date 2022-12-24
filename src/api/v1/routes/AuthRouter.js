const { Router } = require('express');
const passport = require('passport');
const controller = require('../../controllers/AuthController');

const router = Router();

router.post('/login', passport.authenticate('local', {session: false}), controller.login);
//router.post('/register', controller.register);

router.post('/verify', passport.authenticate('jwt', {session:false}), (req, res) => {
    res.status(200).json({ payload:req.user });
});

module.exports = router;