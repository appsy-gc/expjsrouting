// import express
const express = require("express")
const mongoose = require("mongoose")

const postRouter = require("./routes/postRoutes")
const categoryRouter = require("./routes/categoryRoutes")
const commentRouter = require("./routes/commentRoutes")
const userRouter = require("./routes/userRoutes")
const logger = require("./middlewares/logger")

// instantiate express
const app = express()

app.use(express.json())
// all routes after logger will use the logger
app.use(logger)

app.use("/posts", postRouter)
app.use("/categories", categoryRouter)
app.use("/comments", commentRouter)
app.use("/users", userRouter)

// start server with two parameters; port and callback function
app.listen(3000, async () => {
    console.log("Server started...")
    await mongoose.connect("mongodb://127.0.0.1:27017/blog_db")
    console.log("Database Connected...")
})