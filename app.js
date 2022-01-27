/*
    The Beginning of Everything
    Created : 2021 by War
*/

// Some needed modules --------- trying removing one
const express = require('express')
const cors = require('cors')

// Configuration
const { uploadDir, port } = require('./constants/config')

// Routes
const home = require('./src/routes/home')
const login = require('./src/routes/login')
const auth = require('./src/routes/auth')
const admin = require('./src/routes/admin')

// Essential Variables
const app = express()

// Middlewares
app.use(express.json({ limit: '10mb' })) // for parsing application/json
app.use(express.urlencoded({ extended: true, limit: '10mb' })) // for parsing application/x-www-form-urlencoded
app.use(cors())

// Route Middlewares
app.use(express.static(uploadDir))
app.use('/home', home)
app.use('/login', login)
app.use('/', auth)
app.use('/admin', admin)

app.listen(port, () => console.log(`App listening on port ${port}!`))