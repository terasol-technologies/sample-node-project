/*
    Admin Routes
    Created : 2021 by War
*/

// Some needed modules --------- trying removing one
const { Router } = require('express')
const { createAdminController, updateAdminController, fetchSelfAdminController, fetchAdminController } = require('../controllers/admin')
const { messages } = require('../../utils/utility')
const { vCreateAdmin, vUpdateAdmin, vFetchAdmin } = require('../validators/admin')

// Essential Variables
const router = Router()
let routeSection // To be used to config each routing section

/*---------------------------- Admin Section -------------------------*/

// Create
router.post('/', vCreateAdmin, createAdminController)

// Update
router.put('/:id(\\d{1,})', vUpdateAdmin, updateAdminController)

// Fetch Self
router.get('/self', fetchSelfAdminController)

// Fetch
router.get('/', vFetchAdmin, fetchAdminController)

/*---------------------------- Admin Section -------------------------*/

// Defining any arbitary route
router.all('/*', (req, res) => {
    res.send(messages('routes', 'blank'))
})

module.exports = router
