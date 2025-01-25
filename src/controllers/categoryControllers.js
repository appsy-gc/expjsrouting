const Category = require("../models/category")

async function getCategories() {
    const categories = await Category.find()
    return categories
}

async function getCategory(catId) {
    const category = await Category.findById(catId)
    return category
}

async function createCategory(category) {
    const newCategory = await Category.create(category)
    return newCategory
}

async function updateCategory(catId, category) {
    const updatedCategory = await Category.findByIdAndUpdate(catId, category, { new: true })
    return updatedCategory
}

async function deleteCategory(catId) {
    const deletedCategory = await Category.findByIdAndDelete(catId)
    return deletedCategory
}

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}