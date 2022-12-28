const { Router } = require('express');
const controller = require('../../controllers/RowsController');
const roles = require('../../database/models/UserRolesEnum');
const ownsShop = require('../../middlewares/ownsShop');
const hasRole = require('../../middlewares/rolesAuthentication');

const forShopRouter = Router({ mergeParams: true});
const forShopRouterOnwer = Router({ mergeParams: true});
const forShopRouterCustomer = Router({ mergeParams: true});
const publicRouter = Router();
const { validateRowUpdate } = require('../../middlewares/validations/rowsValidations');

forShopRouter.use(hasRole([roles.OWNER, roles.ADMIN]), ownsShop, forShopRouterOnwer);
forShopRouter.use(forShopRouterCustomer);

publicRouter.get('/', controller.getAllRows);
publicRouter.get('/:rowId', controller.getRowById);

// only shop owner can do this (shop determined by token)
forShopRouterOnwer.post('/start', controller.addRow);
forShopRouterOnwer.put('/resume', controller.resumeRow);
forShopRouterOnwer.put('/stop', controller.stopRow);
forShopRouterOnwer.put('/', validateRowUpdate, controller.updateRow);
forShopRouterOnwer.delete('/finish', controller.deleteRow);

// user determined by token
forShopRouterCustomer.post('/join', controller.userJoinRow);
forShopRouterCustomer.delete('/leave', controller.userLeaveRow);

module.exports = {
    forShopRouter,
    publicRouter,
};