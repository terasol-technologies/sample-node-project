/*
    Login Routes
    Created : 2021 by War
*/

// Some needed modules --------- trying removing one
const { Router } = require('express')
const { messages } = require('../../utils/utility')
const { authenticateAdminController } = require('../controllers/admin')
const { vAuthenticateAdmin } = require('../validators/admin')

// Essential Variables
const router = Router()
let routeSection // To be used to config each routing section

// Defining Home Page Route
router.all('/', (req, res) => {
    res.send(messages('routes', 'blank'))
})

/*---------------------------- Admin Section -------------------------*/

routeSection = '/admin'
router.post(routeSection + '/', vAuthenticateAdmin, authenticateAdminController)

/*---------------------------- End Admin Section -------------------------*/

// Defining any arbitary route
router.all('/*', (req, res) => {
    res.send(messages('routes', 'blank'))
})

module.exports = router
