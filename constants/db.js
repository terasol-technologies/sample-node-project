/*
    Database Connection Configuration
    Created : 2021 by War
*/

// Some needed modules --------- trying removing one
const { createPool } = require('mysql')
const { logData } = require('../utils/utility')
const { mysqlPoolLimit, mysqlHost, mysqlUser, mysqlPassword, mysqlDatabase, mysqlTimezone } = require('./config')

// Essential Variables
const pool = createPool({
    connectionLimit: mysqlPoolLimit,
    host: mysqlHost,
    user: mysqlUser,
    password: mysqlPassword,
    database: mysqlDatabase,
    timezone: mysqlTimezone
})

const executeQuery = (query) => {
    return new Promise((resolve, reject) => {
        pool.query(query.text, query.values, (error, results) => {
            if (error) {
                reject(error)
            }
            if (!results) {
                results = []
            }
            resolve(results)
        })
    })
}

// Exports ------------- Needed utmost as without these nothing will work
module.exports.processQuery = async (query) => {
    logData(query)
    try {
        return await executeQuery(query)
    } catch (e) {
        logData(e.sqlMessage)
        throw (e.sqlMessage)
    }
}