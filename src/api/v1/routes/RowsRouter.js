const { Router } = require('express');
const controller = require('../../controllers/RowsController');
const roles = require('../../database/models/UserRolesEnum');
const ownsShop = require('../../middlewares/ownsShop');
const hasRole = require('../../middlewares/rolesAuthentication');

const forShopRouterOnwer = Router({ mergeParams: true});
const forShopRouterCustomer = Router({ mergeParams: true});
const publicRouter = Router();
const { validateRowUpdate } = require('../../middlewares/validations/rowsValidations');

publicRouter.get('/', controller.getAllRows);
publicRouter.get('/:rowId', controller.getRowById);

// user determined by token
forShopRouterCustomer.use(hasRole([roles.CUSTOMER]));
forShopRouterCustomer.post('/join', controller.userJoinRow);
forShopRouterCustomer.delete('/leave', controller.userLeaveRow);

// only shop owner can do this (shop determined by token)
forShopRouterOnwer.use(hasRole([roles.OWNER, roles.ADMIN]), ownsShop);
forShopRouterOnwer.post('/start', controller.addRow);
forShopRouterOnwer.put('/resume', controller.resumeRow);
forShopRouterOnwer.put('/stop', controller.stopRow);
forShopRouterOnwer.put('/', validateRowUpdate, controller.updateRow);
forShopRouterOnwer.delete('/finish', controller.deleteRow);


module.exports = {
    forShopRouterOnwer,
    forShopRouterCustomer,
    publicRouter,
};