/*
    Admin Validations
    Created : 2021 by War
*/

// Some needed modules --------- trying removing one
const { check } = require('express-validator')

// Validations
const vAuthenticateAdmin = [
    check('email').exists().trim().isEmail(),
    check('password').exists().trim().isLength({ min: 3, max: 32 })
]

const vCreateAdmin = [
    check('name').exists().trim().isLength({ min: 3, max: 64 }),
    check('email').exists().trim().isEmail().isLength({ min: 3, max: 128 }),
    check('password').exists().trim().isLength({ min: 3, max: 32 })
]

const vUpdateAdmin = [
    check('id').exists().trim().isInt(),
    check('name').optional().trim().isLength({ min: 3, max: 64 }),
    check('password').optional().trim().isLength({ min: 3, max: 32 })
]

const vFetchAdmin = [
    check('o').optional().isInt(),
    check('l').optional().isInt()
]

// Exports ------------- Needed utmost as without these nothing will work
module.exports = {
    vAuthenticateAdmin,
    vCreateAdmin,
    vUpdateAdmin,
    vFetchAdmin
}