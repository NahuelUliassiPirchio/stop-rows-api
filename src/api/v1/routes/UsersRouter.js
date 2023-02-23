const { Router } = require('express');
const controller = require('../../controllers/UsersController');

const { validateUser, validateUserUpdate } = require('../../middlewares/validations/usersValidations');
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     NewUser:
 *       type: object
 *       required:
 *         - email
 *         - username
 *         - password
 *         - role
 *         - name
 *       properties:
 *         email:
 *           type: string
 *           description: username for user
 *         username:
 *           type: string
 *           description: nickname for user
 *         role:
 *           type: string
 *           description: role of user
 *         name:
 *           type: string
 *           description: name of user
 *         password:
 *           type: string
 *           description: password
 *       example:
 *         name: rowstopper
 *         username: rowstopper
 *         role: customer
 *         email: rowstopper@exampl.com
 *         password: test@123
 * 
 *     User:
 *       type: object
 *       properties:
 *         id:
 *          type: string
 *          description: auto generated in database
 *         email:
 *           type: string
 *           description: username for user
 *         username:
 *           type: string
 *           description: nickname for user
 *         role:
 *           type: string
 *           description: role of user
 *         name:
 *           type: string
 *           description: name of user
 *       example:
 *         id: af51dojk5616hnap5615fsd
 *         name: rowstopper
 *         username: rowstopper
 *         role: customer
 *         email: rowstopper@exampl.com
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     securityDefinitions:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *     responses:
 *       200:
 *         description: the list of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: internal error
 */
router.get('/', controller.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Returns the user
 *     tags: [Users]
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
 *          description: id to find the user
 *     responses:
 *       200:
 *         description: Returns the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *          description: user not found
 *       500:
 *          description: server error
 */
router.get('/:id', controller.getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Creates a new user
 *     tags: [Users]
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
 *             $ref: '#/components/schemas/NewUser'
 *     responses:
 *       201:
 *         description: creates user
 *       400:
 *         description: invalid input
 *       409:
 *         description: user's email or username already exists
 *       500:
 *          description: error
 */
router.post('/', validateUser, controller.createNewUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Updates information of a user
 *     tags: [Users]
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
 *          description: id to find the user
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/NewUser'
 *     responses:
 *       200:
 *         description: Returns the updated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/User'
 *       409:
 *         description: new user's email or username already exists
 *       404:
 *          description: user not found
 *       500:
 *          description: failed operation
 */
router.put('/:id', validateUserUpdate, controller.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deletes a user
 *     tags: [Users]
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
 *          description: id to find the user
 *     responses:
 *       200:
 *         description: Returns the result of delete operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/User'
 *       404:
 *          description: user not found
 *       500:
 *          description: failed operation
 */
router.delete('/:id', controller.deleteUser);

module.exports = router;
