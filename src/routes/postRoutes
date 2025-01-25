const express = require("express") // Import express

const { 
   getPosts, 
   getPost, 
   createPost, 
   updatePost, 
   deletePost 
} = require("../controllers/postControllers")

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
postRouter.post("/", async (req, res) => {
   const bodyData = {
      title: req.body.title,
      body: req.body.body,
      is_published: req.body.is_published,
      category_id: req.body.category_id
   }
   const newPost = await createPost(bodyData)
   res.json(newPost)
})

// PATCH - /posts/id
postRouter.patch("/:postId", async (req, res) => {
   const bodyData = {
      title: req.body.title,
      body: req.body.body,
      is_published: req.body.is_published,
      category_id: req.body.category_id
   }
   const updatedPost = await updatePost(req.params.postId, bodyData)
   if (updatedPost) {
      res.json(updatedPost)
   } else {
      res.status(404).json({error: `Post with id ${req.params.postId} not found`})
   }
})

// DELETE - /posts/id
postRouter.delete("/:postId", async (req, res) => {
   const deletedPost = await deletePost(req.params.postId)
   if (deletedPost) {
      res.json(deletedPost)
   } else {
      res.status(404).json({error: `Post with id ${req.params.postId} not found`})
   }
})

// default export
module.exports = postRouter // Export postRouter from this file 