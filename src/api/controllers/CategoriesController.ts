import CategoriesService from '../services/CategoriesService';
import { Response, Request, NextFunction } from 'express';

const CategoriesController = {
    getAllCategories: async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const categories = await CategoriesService.getAllCategories();
            res.status(200).json(categories);
        } catch (err) {
            next(err);
        }
    },
    getCategoryById: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const category = await CategoriesService.getCategoryById(id);
            res.status(200).json(category);
        } catch (err) {
            next(err);
        }
    },
    addCategory: async (req: Request, res: Response, next: NextFunction) => {
        const { body } = req;
        try {
            const category = await CategoriesService.addCategory(body);
            res.status(201).json(category);
        } catch (err) {
            next(err);
        }
    },
    updateCategory: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const { body } = req;
        try {
            const category = await CategoriesService.updateCategory(id, body);
            res.status(200).json(category);
        } catch (err) {
            next(err);
        }
    },
    deleteCategory: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const category = await CategoriesService.deleteCategory(id);
            res.status(200).json(category);
        } catch (err) {
            next(err);
        }
    },
};

export default CategoriesController;