const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function registerUser(user) {
    const existingUser = await User.findOne({ email: user.email })
    if (existingUser) {
        return { error: "Email already exists" }
    }
    // Hash the password
    const hashedPass = await bcrypt.hash(user.password, 10)
    // Create the user
    const userCreated = await User.create({
        name: user.name,
        email: user.email,
        password: hashedPass,
        is_admin: false
    })
    // Create the token
    const payload = {
        id: userCreated._id
    }
    const token = jwt.sign(payload, 'secret')
    return { token: token, user_id: userCreated._id }
}

async function loginUser(user) {
    // check if user exists
    const existingUser = await User.findOne({ email: user.email })
    if (!existingUser) {
        return { error: "User does not exist" }
    }
    // check if password matches
    const isMatch = await bcrypt.compare(user.password, existingUser.password)
    if (!isMatch) {
        return { error: "Email or password incorrect" }
    }
    // create token
    const payload = {
        id: existingUser._ud
    }
    const token = jwt.sign(payload, 'secret')
    // return the token
    // token: token = token
    return { token, user_id: existingUser._id }
}

module.exports = {
    registerUser,
    loginUser
}