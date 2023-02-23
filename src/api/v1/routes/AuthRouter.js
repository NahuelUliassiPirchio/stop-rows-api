const { Router } = require('express');
const passport = require('passport');
const controller = require('../../controllers/AuthController');

const jwt = require('jsonwebtoken');
const router = Router();
const config = require('../../config');
const { validateSignUp, validateLogin } = require('../../middlewares/validations/authValidations');

/**
 * @swagger
 * components:
 *   schemas:
 *     Tokens:
 *       type: object
 *       properties:
 *         refreshToken:
 *           type: string
 *           description: the refresh token
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWIwM2I4MjIwMmI2MWFlYThhZWM0NSIsInJvbGUiOiJvd25lciIsImlhdCI6MTY3NzIwNzU1MiwiZXhwIjoxNjc3MjA5NTUyfQ.uXPJ4xEGUBng0Ttvu5TQ7ctzQxK2uN98YfDuvuZ28PM
 *         accessToken:
 *           type: object
 *           description: the access token
 *           properties:
 *             token:
 *               type: string
 *               description: the access token
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWIwM2I4MjIwMmI2MWFlYThhZWM0NSIsInJvbGUiOiJvd25lciIsImlhdCI6MTY3NzIwNzU1MiwiZXhwIjoxNjc3MjIxOTUyfQ.NeyU8ZHXYzRD5ZYx4ZvOjdPVPyEZPpHDObs3bTYO8oc
 *             expiresIn:
 *               type: number
 *               description: the access token expiration time
 *               example: 3600 
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user and return access and refresh tokens
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: the user's email
 *                 example: example@example.com
 *               password:
 *                 type: string
 *                 description: the user's password
 *                 example: password
 *     responses:
 *       200:
 *         description: access and refresh tokens
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tokens'
 *       401:
 *         description: invalid credentials
 *       500:
 *         description: internal error
 */
router.post('/login', validateLogin, passport.authenticate('local', {session: false}), controller.login);

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Signup user and return access and refresh tokens
 *     tags: [Auth]
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
 *       200:
 *         description: user successfully created + access and refresh tokens
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tokens'
 *       400:
 *         description: invalid information
 *       409:
 *         description: user already exists
 *       500:
 *         description: internal error
 */
router.post('/signup', validateSignUp, controller.signup);

/**
 * @swagger
 * /refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     securityDefinitions:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *     responses:
 *       200:
 *         description: access token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tokens'
 *       401:
 *         description: invalid refresh token
 *       400:
 *         description: invalid information
 *       409:
 *         description: user already exists
 *       500:
 *         description: internal error
 */
router.post('/refresh', passport.authenticate('jwt-refresh', {session: false}), controller.refresh);

router.post('/verify', async (req, res) => {
    const { token } = req.body;
    try {
        const decoded = jwt.verify(token, config.jwt.accessSecret);
        return res.status(200).json({ decoded });
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
});

module.exports = router;