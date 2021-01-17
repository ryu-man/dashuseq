const router = require('express').Router()
const {User} = require('../model')

console.log(User)
// login handler
router.post("/login", async (req, res) => {
    try {
        // Extract email and password from request body
        const { email, password } = req.body
        // verify if user exist
        let user = await authenticate(email, password)
        // Check if the user exist
        if (user) {
            // generate authentication token
            const jwt = require('jsonwebtoken')
            const token = jwt.sign({ email: user.email }, "secret")
            // send user object with the generated token
            res.json({ email: user.email, createdAt: user.createdAt, token })
        } else {
            // user not found
            res.statusCode = 404
            res.send()

        }

    } catch (err) {
        res.statusCode = 505
        res.send(err)
    }
})
// sign up handler
router.post("/signup", async (req, res) => {
    // Extract email and password from request body
    const { email, password } = req.body
    // Check email and password are not undefined or null
    if (email && password) {
        // Create new user
        const user = await User.create({ email, password })
        res.json(user)
    }
    res.statusCode = 404
    res.send()
})

// match user's credentials and return a user object if exist otherwise return undefined
async function authenticate(email, password) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
    if (re.test(email)) {
        try {
            const user = await User.findByPk(email)
            if (user) {
                const bcrypt = require('bcrypt')
                if (bcrypt.compareSync(password, user.password)) {
                    return user
                }
            }
        } catch (err) {

            return undefined
        }
    }
    return undefined
}

// Setup "auth" route in Express ap

module.exports = (app) => {
    app.use('/', router)
}