const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    let token = req.get('authorization') // bearer token
    token = token?.split(' ')?.[1] // give us 'token' from bearer token + optional chaining
    if (!token) {
        return res.status(401).json({ error: "You don't have the authoratah bitch" })
    }
    try {
        const payload = jwt.verify(token, 'secret')
        req.userId = payload.id
        next()
    } catch(err) {
        console.log(err)
        return res.status(401).json({ error: "Not allowed, bitch" })
    }
}

module.exports = auth