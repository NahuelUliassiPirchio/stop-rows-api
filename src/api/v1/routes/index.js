const { Router } = require('express');
const router = Router();

const usersRouter = require('./UsersRouter');
const profileRouter = require('./ProfileRouter');
const shopsRouter = require('./ShopsRouter');
const categoriesRouter = require('./CategoriesRouter');
const authRouter = require('./AuthRouter');
const rowsRouter = require('./RowsRouter');
const passport = require('passport');

router.use('/auth', authRouter);
router.use('/rows', rowsRouter.publicRouter);
router.use('/shops', shopsRouter);
shopsRouter.use('/:shopId/rows', passport.authenticate('jwt', {session: false}), rowsRouter.forShopRouterOnwer);
router.use('/rows/:rowId', passport.authenticate('jwt', {session: false}), rowsRouter.forShopRouterCustomer);
router.use('/users', usersRouter);
router.use('/profile', passport.authenticate('jwt-refresh', {session: false}), profileRouter);
router.use('/categories', categoriesRouter);

module.exports = router;