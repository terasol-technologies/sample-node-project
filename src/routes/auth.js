/*
    Authorization Functions for Project
    Created : 2021 by War
*/

// Some needed modules --------- trying removing one
const { Router } = require('express')
const passport = require('passport')
const { ExtractJwt, Strategy } = require('passport-jwt')
const { authKey, users } = require('../../constants/config')
const { fetchSingleAdminModel } = require('../models/admin')

const router = Router()

/* Auhtorization of User Accessing the Server */
passport.use(new Strategy({
    secretOrKey: authKey,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
    let userType = token.user.id
    let userId = token.user.user_id
    let response = null
    try {
        switch (userType) {
            case users.admin:
                response = await fetchSingleAdminModel(userId)
                break
            default:
                return done(null, { status: 302 })
        }
        if (response[0].email == token.user.email) {
            return done(null, {
                status: 200,
                user_type: userType,
                id: userId
            })
        }

        return done(null, { status: 302 })
    } catch (e) {
        logData(e)
        return done(null, { status: 302 })
    }
}))
/* End Auhtorization of User Accessing the Server */

// Defining Home Routes
router.all('/', (req, res) => {
    res.send(messages('routes', 'blank'))
})

// Authentication
router.all('/*', passport.authenticate(['jwt'], { session: false }), (req, res, next) => {
    if (req.user.status == 200) {
        next()
    } else {
        res.status(302).json({
            status: 302,
            message: messages('routes', 'accessDenied')
        })
    }
})

// Exports ------------- Needed utmost as without these nothing will work
module.exports = router
