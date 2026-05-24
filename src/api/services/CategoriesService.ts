import { ICategory } from '../../types/Cagegory';
import Category from '../database/models/Category';

const CategoriesService = {
    getAllCategories: async () => {
        const categories = await Category.find();
        return categories;
    },
    getCategoryById: async (id: string) => {
        const category = await Category.findById(id);
        return category;
    },
    addCategory: async (category: ICategory) => {
        const newCategory = await Category.create(category);
        return newCategory;
    },
    updateCategory: async (id: string, category: ICategory) => {
        const updatedCategory = await Category.findByIdAndUpdate(id, category, {new: true});
        return updatedCategory;
    },
    deleteCategory: async (id: string) => {
        const deletedCategory = await Category.findByIdAndDelete(id);
        return deletedCategory;
    }
};

export default CategoriesService;