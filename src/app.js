// import express
const express = require("express")
const mongoose = require("mongoose")

const postRouter = require("./routes/postRoutes")

// instantiate express
const app = express()

app.use("/posts", postRouter)

// start server with two parameters; port and callback function
app.listen(3000, async () => {
    console.log("Server started shitdick")
    await mongoose.connect("mongodb://127.0.0.1:27017/blog_db")
    console.log("Database Connected")
})