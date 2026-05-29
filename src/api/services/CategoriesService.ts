import { ICategory } from '../../types/Cagegory';
import Category from '../database/models/Category';
import cache from './CacheService';

const CATEGORIES_ALL = 'categories:all';
const CATEGORY_KEY = (id: string) => `categories:${id}`;
const TTL = 3600;

const CategoriesService = {
    getAllCategories: async () => {
        const cached = cache.get(CATEGORIES_ALL);
        if (cached) return cached;
        const categories = await Category.find();
        cache.set(CATEGORIES_ALL, categories, TTL);
        return categories;
    },
    getCategoryById: async (id: string) => {
        const cached = cache.get(CATEGORY_KEY(id));
        if (cached) return cached;
        const category = await Category.findById(id);
        if (category) cache.set(CATEGORY_KEY(id), category, TTL);
        return category;
    },
    addCategory: async (category: ICategory) => {
        const newCategory = await Category.create(category);
        cache.del(CATEGORIES_ALL);
        return newCategory;
    },
    updateCategory: async (id: string, category: ICategory) => {
        const updatedCategory = await Category.findByIdAndUpdate(id, category, {new: true});
        cache.del(CATEGORIES_ALL);
        cache.del(CATEGORY_KEY(id));
        return updatedCategory;
    },
    deleteCategory: async (id: string) => {
        const deletedCategory = await Category.findByIdAndDelete(id);
        cache.del(CATEGORIES_ALL);
        cache.del(CATEGORY_KEY(id));
        return deletedCategory;
    }
};

export default CategoriesService;