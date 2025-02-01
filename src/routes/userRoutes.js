const express = require('express')

const { registerUser } = require('../controllers/userControllers')

const userRouter = express.Router()

userRouter.post('/register', async (req, res) => {
    const bodyData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    const token = await registerUser(bodyData)
    if (token.error) {
        res.status(409).json(token)
    } else {
        res.json(token)
    }
    res.json(token)
})

module.exports = userRouter