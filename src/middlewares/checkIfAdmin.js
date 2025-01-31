const checkIfAdmin = (req, res, next) => {
    // if (req.headers.authorization) {
    //     Extract token
    //     Verify the token
    //     Extract user id from token
    //     get the user from the db using user id
    //     check if user is admin or not
    // }
    const isAdmin = true
    if (isAdmin) {
        req.isAdmin = isAdmin
        next()
    } else {
        res.status(403).json({
            error: "Only an admin can perform these actions"
        })
    }
}

module.exports = checkIfAdmin