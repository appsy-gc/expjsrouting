const express = require('express')

const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryControllers")

const checkIfAdmin = require('../middlewares/checkIfAdmin')

const categoryRouter = express.Router()

// GET all categories /categories
categoryRouter.get("/", async (req, res) => {
    const categories = await getCategories()
    res.json(categories)
})

// GET a single category /categories/:id
categoryRouter.get('/:catId', async (req, res) => {
    const category = await getCategory(req.params.catId)
    if (category) {
        res.json(category)
    } else {
        res.status(404).json({error: `Category ID: ${req.params.catId} does not exist`})
    }
})

// categoryRouter.use(checkIfAdmin) for all remaining routes, or add to individual routes.

// CREATE a category /categories
categoryRouter.post("/", checkIfAdmin, async (req, res) => {
    const bodyData = {
        title: req.body.title,
        description: req.body.description
    }
    const newCategory = await createCategory(bodyData)
    res.status(201).json(newCategory)
})

// PATCH a category /categories/:id
categoryRouter.patch('/:catId', checkIfAdmin, async (req, res) => {
    const bodyData = {
        title: req.body.title,
        description: req.body.description
    }
    const updatedCategory = await updateCategory(req.params.catId, bodyData)
    if (updatedCategory) {
        res.json(updatedCategory)
    } else {
        res.status(404).json({error: `Category ID: ${req.params.catId} does not exist`})
    }
})

// DELETE a category /categories/:id
categoryRouter.delete('/:catId', async (req, res) => {
    const deletedCategory = await deleteCategory(req.params.catId)
    if (deletedCategory) {
        res.json(deletedCategory)
    } else {
        res.status(404).json({error: `Category ID: ${req.params.catId} does not exist`})
    }
})

module.exports = categoryRouter