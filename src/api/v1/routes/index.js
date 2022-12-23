const { Router } = require('express');
const router = Router();

const usersRouter = require('./UsersRouter');
const shopsRouter = require('./ShopsRouter');
const categoriesRouter = require('./CategoriesRouter');

router.use('/users', usersRouter);
router.use('/shops', shopsRouter);
router.use('/categories', categoriesRouter);

module.exports = router;