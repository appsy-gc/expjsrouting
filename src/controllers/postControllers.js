const { Post } = require("../models/post")

// Get data from database in the model
async function getPosts() {
    const posts = await Post.find() // Can filter in {is_published: true}
    return posts
}

// Controller for getting single post
async function getPost(postId) {
    const post = await Post.findById(postId)
    // alternatively, const post = await Post.find({ _id: postID })[0]
    return post
}

// Controller for creating a post
async function createPost(post) {
    const newPost = await Post.create(post)
    return newPost
}

async function updatePost(postId, post) {
    // adding { new: true } will provide the updated info in the insomina output
    const updatedPost = await Post.findByIdAndUpdate(postId, post, { new: true })
    return updatedPost
}

async function deletePost(postId) {
    const deletedPost = await Post.findByIdAndDelete(postId)
    return deletedPost
}

// named exports
module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
} 