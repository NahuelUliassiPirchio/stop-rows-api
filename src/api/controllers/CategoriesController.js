const CategoriesService = require('../services/CategoriesService');

const CategoriesController = {
    getAllCategories: async (_req, res, next) => {
        try {
            const categories = await CategoriesService.getAllCategories();
            res.status(200).json(categories);
        } catch (err) {
            next(err);
        }
    },
    getCategoryById: async (req, res, next) => {
        const { id } = req.params;
        try {
            const category = await CategoriesService.getCategoryById(id);
            res.status(200).json(category);
        } catch (err) {
            next(err);
        }
    },
    addCategory: async (req, res, next) => {
        const { body } = req;
        try {
            const category = await CategoriesService.addCategory(body);
            res.status(201).json(category);
        } catch (err) {
            next(err);
        }
    },
    updateCategory: async (req, res, next) => {
        const { id } = req.params;
        const { body } = req;
        try {
            const category = await CategoriesService.updateCategory(id, body);
            res.status(200).json(category);
        } catch (err) {
            next(err);
        }
    },
    deleteCategory: async (req, res, next) => {
        const { id } = req.params;
        try {
            const category = await CategoriesService.deleteCategory(id);
            res.status(200).json(category);
        } catch (err) {
            next(err);
        }
    },
};

module.exports = CategoriesController;