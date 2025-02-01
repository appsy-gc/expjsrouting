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

module.exports = {
    registerUser
}