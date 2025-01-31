const mongoose = require("mongoose")

// Add schema for sub-document commenting
const CommentSchema = mongoose.Schema({
    message: String
})

const PostSchema = mongoose.Schema({
    title: String,
    body: String,
    is_published: Boolean,
    category_id: {
        type: mongoose.Types.ObjectId,
        ref: "Category" // this name must match the name of the model in category
    },
    comments: [CommentSchema] // Single post with single comment
    // comments: [CommentSchema] can be used for multiple comments in a single post (i.e., a 'list' of comments)
})


// Create mongoose models
const Post = mongoose.model("Post", PostSchema)
const Comment = mongoose.model("Comment", CommentSchema)

module.exports = {
    Post,
    Comment
}