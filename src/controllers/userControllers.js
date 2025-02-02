const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/user")

async function registerUser(user) {
    const existingUser = await  User.findOne({ email: user.email })
    if (existingUser) {
        return { error: "Email already exists" }
    }
    // hash the password
    const hashedPassword = await bcrypt.hash(user.password, 10)
    // create the user
    const userCreated = await User.create({
        name: user.name,
        email: user.email,
        password: hashedPassword,
        is_admin: false,
    })
    // create the token
    const payload = {
        id: userCreated._id
    }
    const token = jwt.sign(payload, "secret")
    return { token: token, user_id: userCreated._id }
}

async function loginUser(user) {
    // check if user exists
    const existingUser = await User.findOne({ email: user.email })
    if (!existingUser) {
        return { error: "email or password incorrect" }
    }
    // check if the password matches
    const isMatch = await bcrypt.compare(user.password, existingUser.password)
    if (!isMatch) {
        return { error: "email or password incorrect" }
    }
    // create the token
    const payload = {
        id: existingUser._id
    }
    const token = jwt.sign(payload, "secret")
    // return the token
    return { token, user_id: existingUser._id }
}

module.exports = {
    registerUser,
    loginUser,
}