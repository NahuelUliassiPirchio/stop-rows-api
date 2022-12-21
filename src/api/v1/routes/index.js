const { Router } = require('express');
const router = Router();

const usersRouter = require('./UsersRouter');
const shopsRouter = require('./ShopsRouter');

router.use('/users', usersRouter);
router.use('/shops', shopsRouter);

module.exports = router;