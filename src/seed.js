const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const User = require("./models/user")

mongoose.connect("mongodb://127.0.0.1:27017/blog_db").then(async () => {
    console.log("Database connected")
    // seed database
    // delete existing admin if there is one
    await User.deleteMany({ is_admin: true })
    // create a hashed password
    const hashedPassword = await bcrypt.hash("adminpw", 10)
    // create a new admin
    const admin = await User.create({
        email: "admin@email.com",
        password: hashedPassword,
        is_admin: true,
    })
    console.log(admin)
    // close the connection
    mongoose.connection.close()
})