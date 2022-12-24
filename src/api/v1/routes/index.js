const { Router } = require('express');
const router = Router();

const usersRouter = require('./UsersRouter');
const shopsRouter = require('./ShopsRouter');
const categoriesRouter = require('./CategoriesRouter');
const authRouter = require('./AuthRouter');
const rowsRouter = require('./RowsRouter');

router.use('/auth', authRouter);
router.use('/rows', rowsRouter.publicRouter);
router.use('/shops', shopsRouter);
shopsRouter.use('/:shopId/rows', rowsRouter.forShopRouter);
router.use('/users', usersRouter);
router.use('/categories', categoriesRouter);

module.exports = router;