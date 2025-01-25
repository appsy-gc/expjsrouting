const mongoose = require("mongoose")

const PostSchema = mongoose.Schema({
    title: String,
    body: String,
    is_published: Boolean,
    category_id: {
        type: mongoose.Types.ObjectId,
        ref: "Category" // this name must match the name of the model in category
    }
})

const Post = mongoose.model("Post", PostSchema)

module.exports = Post