const { Router } = require('express');
const controller = require('../../controllers/RowsController');

const forShopRouter = Router({ mergeParams: true});
const publicRouter = Router();
const { validateRow, validateRowUpdate } = require('../../middlewares/validations/rowsValidations');

publicRouter.get('/', controller.getAllRows);
publicRouter.get('/:rowId', controller.getRowById);

// only shop owner can do this (shop determined by token)
forShopRouter.post('/start', controller.addRow);
forShopRouter.put('/resume', controller.resumeRow);
forShopRouter.put('/stop', controller.stopRow);
forShopRouter.put('/', validateRowUpdate, controller.updateRow);
forShopRouter.delete('/finish', controller.deleteRow);

// user determined by token
forShopRouter.post('/join', controller.userJoinRow);
forShopRouter.delete('/leave', controller.userLeaveRow);

module.exports = {
    forShopRouter,
    publicRouter,
};