const { Router } = require('express');
const controller = require('../../controllers/CategoriesController');

const { validateCategory, validateCategoryUpdate } = require('../../middlewares/validations/categoriesValidations');
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     NewCategory:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: the name of the category
 *       example:
 *         name: Electronics
 *     Category:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: the name of the category
 *         id:
 *           type: string
 *           description: the id of the category
 *       example:
 *         name: Electronics
 *         id: 60b9f1b0e3c6b8a0b4e1b0e5
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Returns the list of all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: the list of all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Category'
 *       500:
 *         description: internal error
 */
router.get('/', controller.getAllCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Returns the category
 *     tags: [Categories]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *              required: true
 *          description: id to find the category
 *     responses:
 *       200:
 *         description: Returns the category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *          description: category not found
 *       500:
 *          description: server error
 */
router.get('/:id', controller.getCategoryById);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Creates a new category
 *     tags: [Categories]
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
 *             $ref: '#/components/schemas/NewCategory'
 *     responses:
 *       201:
 *         description: creates category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: invalid input
 *       409:
 *         description: category's email or categoryname already exists
 *       500:
 *          description: error
 */
router.post('/', validateCategory, controller.addCategory);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Updates information of a category
 *     tags: [Categories]
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
 *          description: id to find the category
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                      - name
 *                  properties:
 *                      name:
 *                          type: string
 *                          description: the name of the category
 *                  example:
 *                      name: Electronics
 *     responses:
 *       200:
 *         description: Returns the updated category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       409:
 *         description: new category's email or categoryname already exists
 *       404:
 *          description: category not found
 *       500:
 *          description: failed operation
 */
router.put('/:id', validateCategoryUpdate, controller.updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Deletes a category
 *     tags: [Categories]
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
 *          description: id to find the category
 *     responses:
 *       200:
 *         description: returns the result of delete operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Category'
 *       404:
 *          description: category not found
 *       500:
 *          description: failed operation
 */
router.delete('/:id', controller.deleteCategory);

module.exports = router;