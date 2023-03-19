const { Router } = require('express');
const passport = require('passport');
const controller = require('../../controllers/ShopsController');
const ownsShop = require('../../middlewares/ownsShop');

const { validateShop, validateShopUpdate, validateShopFilter } = require('../../middlewares/validations/shopsValidations');
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     NewShop:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - address
 *         - phone
 *         - email
 *         - website
 *         - logo
 *         - owner
 *         - coords
 *         - categories
 *       properties:
 *         name:
 *           type: string
 *           description: the name of the shop
 *         description:
 *           type: string
 *           description: the description of the shop
 *         address:
 *           type: string
 *           description: the address of the shop
 *         phone:
 *           type: string
 *           description: the phone number of the shop
 *         email:
 *           type: string
 *           description: the email of the shop
 *         website:
 *           type: string
 *           description: the website of the shop
 *         logo:
 *           type: string
 *           description: the link to the logo of the shop
 *         coords:
 *           type: array
 *           description: the coordinates of the shop [lat, lng]
 *         categories:
 *           type: array
 *           description: the ids of the categories of the shop
 *       example:
 *        name: shop
 *        description: shop description
 *        address: shop address
 *        phone: 0123456789
 *        email: shop@exampl.com
 *        website: shop.com
 *        logo: shop.com/logo
 *        coords: [30.123, 30.123]
 *        categories: [5f9f1b9f1b9f1b9f1b9f1b9f, 5f9f1b9f1b9f1b9f1b9f1b9f]
 * 
 *     Shop:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: auto generated in database
 *         name:
 *           type: string
 *           description: the name of the shop
 *         description:
 *           type: string
 *           description: the description of the shop
 *         address:
 *           type: string
 *           description: the address of the shop
 *         phone:
 *           type: string
 *           description: the phone number of the shop
 *         email:
 *           type: string
 *           description: the email of the shop
 *         website:
 *           type: string
 *           description: the website of the shop
 *         logo:
 *           type: string
 *           description: the link to the logo of the shop
 *         owner:
 *           type: string
 *           description: the owner's id of the shop
 *         coords:
 *           type: array
 *           description: the coordinates of the shop [lat, lng]
 *         categories:
 *           type: array
 *           description: the ids of the categories of the shop
 *       example:
 *        id: 5f9f1b9f1b9f1b9f1b9f1b9f
 *        name: shop
 *        description: shop description
 *        address: shop address
 *        phone: 0123456789
 *        email: shop@exampl.com
 *        website: shop.com
 *        logo: shop.com/logo
 *        owner: 5f9f1b9f1b9f1b9f1b9f1b9f
 *        coords: [30.123, 30.123]
 *        categories: [5f9f1b9f1b9f1b9f1b9f1b9f, 5f9f1b9f1b9f1b9f1b9f1b9f]
 */

/**
 * @swagger
 * /shops:
 *   get:
 *     summary: Returns the list of all shops
 *     tags: [Shops]
 *     parameters:
 *        - in: query
 *          name: page
 *          schema:
 *              type: number
 *              default: 1
 *          description: the page number
 *        - in: query
 *          name: limit
 *          schema:
 *              type: number
 *              default: 10
 *          description: the page limit
 *        - in: query
 *          name: search
 *          schema:
 *              type: string
 *          description: the search query of the shop name or description
 *        - in: query
 *          name: status
 *          schema:
 *              type: string
 *              enum: [open, closed]
 *          description: the status of the shop
 *        - in: query
 *          name: lat
 *          schema:
 *              type: number
 *          description: the latitude of the user
 *        - in: query
 *          name: lng
 *          schema:
 *              type: number
 *          description: the longitude of the user
 *     responses:
 *       200:
 *         description: the list of all shops
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                data:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Shop'
 *                total:
 *                  type: number
 *                  description: the total number of shops
 *                  example: 10
 *                totalPages:
 *                  type: number
 *                  description: the total number of pages
 *                  example: 2
 *       500:
 *         description: internal error
 */
router.get('/', validateShopFilter, controller.getAllShops);

/**
 * @swagger
 * /shops/{id}:
 *   get:
 *     summary: Returns the shop
 *     tags: [Shops]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *              required: true
 *          description: id to find the shop
 *     responses:
 *       200:
 *         description: Returns the shop
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop'
 *       404:
 *          description: shop not found
 *       500:
 *          description: server error
 */
router.get('/:id', controller.getShopById);

/**
 * @swagger
 * /shops:
 *   post:
 *     summary: Creates a new shop
 *     tags: [Shops]
 *     security:
 *       - bearerAuth: []
 *     securityDefinitions:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewShop'
 *     responses:
 *       201:
 *         description: creates shop
 *         content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/Shop'
 *       400:
 *         description: invalid input
 *       409:
 *         description: shop's email or shopname already exists
 *       500:
 *          description: error
 */
router.post('/', passport.authenticate('jwt', {session: false}), validateShop, controller.addShop);

/**
 * @swagger
 * /shops/{id}:
 *   put:
 *     summary: Updates information of a shop
 *     tags: [Shops]
 *     security:
 *       - bearerAuth: []
 *     securityDefinitions:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *              required: true
 *          description: id to find the shop
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/NewShop'
 *     responses:
 *       200:
 *         description: Returns the updated shop
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop'
 *       409:
 *         description: new shop's email or shopname already exists
 *       404:
 *          description: shop not found
 *       500:
 *          description: failed operation
 */
router.put('/:id', passport.authenticate('jwt', {session: false}), ownsShop, validateShopUpdate, controller.updateShop);

/**
 * @swagger
 * /shops/{id}:
 *   delete:
 *     summary: Deletes a shop
 *     tags: [Shops]
 *     security:
 *       - bearerAuth: []
 *     securityDefinitions:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *              required: true
 *          description: id to find the shop
 *     responses:
 *       200:
 *         description: Returns the result of delete operation
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Shop'
 *       404:
 *          description: shop not found
 *       500:
 *          description: failed operation
 */
router.delete('/:id', passport.authenticate('jwt', {session: false}), ownsShop, controller.deleteShop);

module.exports = router;
