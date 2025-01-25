const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    title: String,
    description: String,
}, {
    collection: 'categories' // use this name for the mongodb collection
})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category