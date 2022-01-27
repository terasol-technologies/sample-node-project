/*
    Home Routes
    Created : 2021 by War
*/

// Some needed modules --------- trying removing one
const { Router } = require('express')
const { messages } = require('../../utils/utility')

// Essential Variables
const router = Router()

// Defining Home Page Route
router.all('/', (req, res) => {
    res.send(messages('routes', 'blank'))
})

// Defining any arbitary route
router.all('/*', (req, res) => {
    res.send(messages('routes', 'blank'))
})

// Exports ------------- Needed utmost as without these nothing will work
module.exports = router