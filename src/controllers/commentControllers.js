const { Post, Comment } = require('../models/post')

async function createComment(comment, postId) {
    const post = await Post.findById(postId)
    if (!post) {
        return { error: "Post not found" }
    }
    const newComment = new Comment(comment)
    post.comments.push(newComment)
    await post.save()
    return newComment
}

async function deleteComment(commentId, postId) {
    const post = await Post.findById(postId)
    if (!post) {
        return { error: "Post not found" }
    }
    const deletedComment = post.comments.id(commentId)
    if (deletedComment) {
        await deletedComment.deleteOne()
        await post.save()
    }
    return deletedComment
}

module.exports = {
    createComment,
    deleteComment
}
