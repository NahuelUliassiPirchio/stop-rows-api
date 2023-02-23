const { Router } = require('express');
const controller = require('../../controllers/ProfileController');

const router = Router();

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Returns user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     securityDefinitions:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *     responses:
 *       200:
 *         description: the user's profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: unauthorized
 *       500:
 *         description: internal error
 */
router.get('/', controller.getProfile);

/**
 * @swagger
 * /profile:
 *   put:
 *     summary: Updates information of user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     securityDefinitions:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/NewUser'
 *     responses:
 *       200:
 *         description: Returns the updated profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: unauthorized
 *       409:
 *         description: new users's email or username already exists
 *       500:
 *          description: failed operation
 */
router.put('/', controller.updateProfile);

/**
 * @swagger
 * /profile:
 *   delete:
 *     summary: Deletes the user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     securityDefinitions:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *     responses:
 *       200:
 *         description: Returns the result of delete operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       401:
 *         description: unauthorized
 *       500:
 *          description: failed operation
 */
router.delete('/', controller.deleteProfile);

/**
 * @swagger
 * /profile/restore:
 *   post:
 *     summary: Restores the deleted user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     securityDefinitions:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *     responses:
 *       200:
 *         description: Returns the user's profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: unauthorized
 *       500:
 *          description: failed operation
 */
router.post('/restore', controller.restoreProfile);

module.exports = router;