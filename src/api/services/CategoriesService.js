const Category = require('../database/models/Category');

const CategoriesService = {
    getAllCategories: async () => {
        const categories = await Category.find();
        return categories;
    },
    getCategoryById: async (id) => {
        const category = await Category.findById(id);
        return category;
    },
    addCategory: async (category) => {
        const newCategory = await Category.create(category);
        return newCategory;
    },
    updateCategory: async (id, category) => {
        const updatedCategory = await Category.findByIdAndUpdate(id, category, {new: true});
        return updatedCategory;
    },
    deleteCategory: async (id) => {
        const deletedCategory = await Category.findByIdAndDelete(id);
        return deletedCategory;
    }
};

module.exports = CategoriesService;