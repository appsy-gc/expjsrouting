const express = require("express") // Import express

const { 
   getPosts, 
   getPost, 
   createPost, 
   updatePost, 
   deletePost 
} = require("../controllers/postControllers")

const auth = require('../middlewares/auth')

const postRouter = express.Router() // Same as blueprint in flask/python

// GET 
postRouter.get("/", async (req, res) => { // '/' means /posts inside this postRouter
   const posts = await getPosts()
   res.json(posts)
})

// GET single post - /posts/id
postRouter.get("/:postId", async (req, res) => {
   const post = await getPost(req.params.postId)
   if (post) {
      res.json(post)
   } else {
      res.status(404).json({error: `Post with id ${req.params.postId} not found`})
   }
})

// CREATE (POST) - /posts
postRouter.post("/", auth, async (req, res) => {
   const bodyData = {
      title: req.body.title,
      body: req.body.body,
      is_published: req.body.is_published,
      category_id: req.body.category_id,
      user_id: req.userId
   }
   const newPost = await createPost(bodyData)
   res.status(201).json(newPost)
})

// PATCH - /posts/id
postRouter.patch("/:postId", auth, async (req, res) => {
   const bodyData = {
      title: req.body.title,
      body: req.body.body,
      is_published: req.body.is_published,
      category_id: req.body.category_id
   }
   const updatedPost = await updatePost(req.params.postId, bodyData, req.userId)
   if (!updatedPost) {
      res.status(404).json({ error: `Post with id ${req.params.postId} not found` })
  } else if (updatedPost.error) {
      res.status(403).json(updatedPost)
  } else {
      res.json(updatedPost)
  }
})

// DELETE - /posts/id
postRouter.delete("/:postId", auth, async (req, res) => {
   const deletedPost = await deletePost(req.params.postId)
   if (deletedPost) {
      res.json(deletedPost)
   } else {
      res.status(404).json({error: `Post with id ${req.params.postId} not found`})
   }
})

// default export
module.exports = postRouter // Export postRouter from this file 