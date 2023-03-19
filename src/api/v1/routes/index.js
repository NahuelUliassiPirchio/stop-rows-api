const { Router } = require('express');
const router = Router();
const passport = require('passport');

const usersRouter = require('./UsersRouter');
const profileRouter = require('./ProfileRouter');
const shopsRouter = require('./ShopsRouter');
const categoriesRouter = require('./CategoriesRouter');
const authRouter = require('./AuthRouter');
const rowsRouter = require('./RowsRouter');

const hasRole = require('../../middlewares/rolesAuthentication');
const roles = require('../../database/models/UserRolesEnum');

router.use('/auth', authRouter);
router.use('/rows', rowsRouter.publicRouter);
router.use('/shops', shopsRouter);
shopsRouter.use('/:shopId/rows', passport.authenticate('jwt', {session: false}), rowsRouter.forShopRouterOnwer);
router.use('/rows/:rowId', passport.authenticate('jwt', {session: false}), rowsRouter.forShopRouterCustomer);
router.use('/users', passport.authenticate('jwt', {session:false}), hasRole(roles.ADMIN), usersRouter);
router.use('/profile', passport.authenticate('jwt', {session: false}), profileRouter);
router.use('/categories', categoriesRouter);

module.exports = router;