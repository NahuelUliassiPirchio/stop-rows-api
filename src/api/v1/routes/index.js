const { Router } = require('express');
const router = Router();

const usersRouter = require('./UsersRouter');

router.use('/users', usersRouter);

module.exports = router;