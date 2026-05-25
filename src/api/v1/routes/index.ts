import { Router, RequestHandler } from 'express';
import passport from 'passport';

import usersRouter from './UsersRouter';
import profileRouter from './ProfileRouter';
import shopsRouter from './ShopsRouter';
import categoriesRouter from './CategoriesRouter';
import authRouter from './AuthRouter';
import { publicRouter as rowsPublicRouter, forShopRouterOnwer, forShopRouterCustomer } from './RowsRouter';

import hasRole from '../../middlewares/rolesAuthentication';
import { UserRolesEnum } from '../../../types/User';

const router = Router();

router.use('/auth', authRouter);
router.use('/rows', rowsPublicRouter);
router.use('/shops', shopsRouter);
shopsRouter.use('/:shopId/rows', passport.authenticate('jwt', {session: false}), forShopRouterOnwer);
router.use('/rows/:rowId', passport.authenticate('jwt', {session: false}), forShopRouterCustomer);
router.use('/users', passport.authenticate('jwt', {session: false}), hasRole([UserRolesEnum.ADMIN]) as RequestHandler, usersRouter);
router.use('/profile', passport.authenticate('jwt', {session: false}), profileRouter);
router.use('/categories', categoriesRouter);

export default router;
