const { Router } = require('express');
const controller = require('../../controllers/RowsController');
const roles = require('../../database/models/UserRolesEnum');
const ownsShop = require('../../middlewares/ownsShop');
const hasRole = require('../../middlewares/rolesAuthentication');

const forShopRouterOnwer = Router({ mergeParams: true});
const forShopRouterCustomer = Router({ mergeParams: true});
const publicRouter = Router();
const { validateRowUpdate } = require('../../middlewares/validations/rowsValidations');

/**
 * @swagger
 * components:
 *   schemas:
 *     NewRow:
 *       type: object
 *       required:
 *        - shop
 *        - customers
 *        - status
 *       properties:
 *         shop:
 *           type: string
 *           description: shop id
 *           example: j2k4n5l6kl4k3n4kn5l3l4nmk5
 *         customers:
 *           type: array
 *           description: array of user ids
 *           example: [5f9f1b9e7c8b9a0b8c7d6e5f]
 *         status:
 *           type: string
 *           description: status of row
 *           example: open
 * 
 *     Row:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: row id
 *         shop:
 *           type: string
 *           description: shop id
 *         customers:
 *           type: array
 *           description: array of user ids
 *         status:
 *           type: string
 *           description: status of row
 */

/**
 * @swagger
 * /rows/:
 *   get:
 *     summary: Returns the list of all rows
 *     tags: [Rows - public]
 *     responses:
 *       200:
 *         description: the list of all rows
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Row'
 *       500:
 *         description: internal error
 */
publicRouter.get('/', controller.getAllRows);
/**
 * @swagger
 * /rows/{id}:
 *   get:
 *     summary: Returns the row
 *     tags: [Rows - public]
 *     responses:
 *       200:
 *         description: 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Row'
 *       404:
 *         description: row not found
 *       500:
 *         description: internal error
 */
publicRouter.get('/:rowId', controller.getRowById);

forShopRouterCustomer.use(hasRole([roles.CUSTOMER]));

/**
 * @swagger
 * /rows/{id}/join:
 *   post:
 *     summary: Add user to row
 *     tags: [Rows - customer]
 *     responses:
 *       200:
 *         description: Returns the row
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Row'
 *       404:
 *         description: row not found
 *       401:
 *         description: user not authorized
 *       500:
 *         description: internal error
 */
forShopRouterCustomer.post('/join', controller.userJoinRow);
/**
 * @swagger
 * /rows/{id}/leave:
 *   delete:
 *     summary: Remove user from row
 *     tags: [Rows - customer]
 *     responses:
 *       200:
 *         description: Returns the row
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: row id
 *                   example: 5f9f1b9e7c8b9a0b8c7d6e5f
 *                 shop:
 *                   type: string
 *                   description: shop id
 *                   example: j2k4n5l6kl4k3n4kn5l3l4n5
 *                 customers:
 *                   type: array
 *                   description: array of user ids
 *                   example: []
 *                 status:
 *                   type: string
 *                   description: status of row
 *                   example: open
 *       404:
 *         description: row not found
 *       401:
 *         description: user not authorized
 *       500:
 *         description: internal error
 */
forShopRouterCustomer.delete('/leave', controller.userLeaveRow);

forShopRouterOnwer.use(hasRole([roles.OWNER, roles.ADMIN]), ownsShop);

/**
 * @swagger
 * /shops/{shopId}/rows/start:
 *   post:
 *     summary: Start a new row
 *     tags: [Rows - owner]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             status:
 *               type: string
 *               description: status of row
 *               example: open
 *     responses:
 *       200:
 *         description: Returns the row
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Row'
 *       401:
 *         description: user not authorized
 *       403:
 *         description: user not owner
 *       404:
 *         description: row not found
 *       409:
 *         description: row already started
 *       500:
 *         description: internal error
 */
forShopRouterOnwer.post('/start', controller.addRow);

/**
 * @swagger
 * /shops/{shopId}/rows/resume:
 *   put:
 *     summary: Resume a stopped row
 *     tags: [Rows - owner]
 *     responses:
 *       200:
 *         description: Returns the row
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Row'
 *       401:
 *         description: user not authorized
 *       403:
 *         description: user not owner
 *       404:
 *         description: row not found
 *       409:
 *         description: row is not stopped
 *       500:
 *         description: internal error
 */
forShopRouterOnwer.put('/resume', controller.resumeRow);
/**
 * @swagger
 * /shops/{shopId}/rows/stop:
 *   put:
 *     summary: Stop a row
 *     tags: [Rows - owner]
 *     responses:
 *       200:
 *         description: Returns the row
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: row id
 *                   example: 5f9f1b9e7c8b9a0b8c7d6e5f
 *                 shop:
 *                   type: string
 *                   description: shop id
 *                   example: j2k4n5l6kl4k3n4kn5l3l4n5
 *                 customers:
 *                   type: array
 *                   description: array of user ids
 *                   example: [3n2knm3kl4n3b4n3l4n3l4n3]
 *                 status:
 *                   type: string
 *                   description: status of row
 *                   example: closed
 *       401:
 *         description: user not authorized
 *       403:
 *         description: user not owner
 *       404:
 *         description: row not found
 *       409:
 *         description: row is not started/resumed
 *       500:
 *         description: internal error
 */
forShopRouterOnwer.put('/stop', controller.stopRow);

/**
 * @swagger
 * /shops/{shopId}/rows/:
 *   put:
 *     summary: Edit a row
 *     tags: [Rows - owner]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Row'
 *     responses:
 *       200:
 *         description: Returns the row
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Row'
 *       401:
 *         description: user not authorized
 *       403:
 *         description: user not owner
 *       404:
 *         description: row not found
 *       409:
 *         description: conflict
 *       500:
 *         description: internal error
 */
forShopRouterOnwer.put('/', validateRowUpdate, controller.updateRow);

/**
 * @swagger
 * /shops/{shopId}/rows/finish:
 *   delete:
 *     summary: Finish a row
 *     tags: [Rows - owner]
 *     responses:
 *       200:
 *         description: Returns the deleted row
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Row'
 *       401:
 *         description: user not authorized
 *       403:
 *         description: user not owner
 *       404:
 *         description: row not found
 *       500:
 *         description: internal error
 */
forShopRouterOnwer.delete('/finish', controller.deleteRow);


module.exports = {
    forShopRouterOnwer,
    forShopRouterCustomer,
    publicRouter,
};