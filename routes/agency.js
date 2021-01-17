const router = require('express').Router()
const authService = require('../service/auth_service')
const {Agency} = require('../model')

// Route protection, user must be authorized to access this route
router.use(authService)

// Retrieve the list of Agencies
router.get('/agency', async (req, res) => {
    try {
        // Retrieve agencies list
        // Sorted createdAt ascendant
        const agencies = await Agency.findAll({ order: [["createdAt", "ASC"]] })
        if (agencies) {
            // Send the list to the client
            res.json(agencies)
        }

        res.status(403).send()

    } catch (err) {
        res.status(500).send()

    }
})

// Add new Agency
router.post('/agency', async (req, res) => {
    // Extract agency's information
    const { name, address, wilaya, commune, phone } = req.body
    // Verify required information
    if (name && wilaya && commune && phone) {
        // Create new agency with given information
        const agency = await Agency.create({
            name, address, wilaya, commune, phone
        })
        // send created agency to the client for ui updating purposes
        res.json(agency)
    }

    // else send bad request response
    res.status(400).send()
})

// Update a given Agency
router.put('/agency/:id', async (req, res) => {
    try {
        // Retrieve agency's id
        const { id } = req.params
        // Check if the id neither undefined nor null
        if (id) {
            // Extract agency's information
            const { name, address, wilaya, commune, phone } = req.body
            // Check that there is at least only one property is not null or undefined
            if (name || address || wilaya || commune || phone) {
                console.log(name, address, wilaya, commune, phone)
                // Find agency and apply update
                const agency = await Agency.findByPk(id)
                // Update agency properties
                name && (agency.name = name)
                address && (agency.address = address)
                wilaya && (agency.wilaya = wilaya)
                commune && (agency.commune = commune)
                phone && (agency.phone = phone)
                await agency.save()
                // Send back Updated agency to the client
                res.json(agency)
            }
            // If request body is empty send back malformed request
            res.status(400).send()
        } else {
            // If the id does not exist send bad request response
            res.status(400).send()

        }

    } catch (err) {
        // If any error occures send Internal error
        res.status(500).send()
    }
})
// Delete a given Agency
router.delete('/agency/:id', async (req, res) => {
    // Retrieve agency's id
    const { id } = req.params
    // Check if the id neither undefined nor null
    if (id) {
        // Find the agency and delete it
        const agency = await Agency.findByPk(id)
        if (agency) {
            // Delete agency
            await agency.destroy()
            // Send OK response
            res.send()
        }
    }
    res.status(400).send()
})
// Capture all the other http request related to the "/agency" route and send back not implemented response
router.use((req, res, next) => {
    res.status(501).send()
})

// Setup "/agency" route in Express app
module.exports = (app) => {
    app.use('/', router)
}