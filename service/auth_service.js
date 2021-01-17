const jwt = require('jsonwebtoken')

// Protection middleware
// Check if the client is authenticated
// Otherwise send back unotherized response
module.exports = (req, res, next) => {
    const { token } = req.headers

    // Check if the request has a token header
    if (token) {
        try {
            // Verify if then toke if valid
            jwt.verify(token, "secret")
            // procced the request ro the next middleware
            next()

        } catch (err) {
            // unauthorized
        res.status(401).send()
        }
    } else {
        // unauthorized
        res.status(401).send()
    }

}

