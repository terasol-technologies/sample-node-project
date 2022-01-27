/*
    Admin Queries
    Created : 2021 by War
*/

const { dbSchema } = require('../../constants/config')
const { admin } = require('../../constants/tables')

const insertAdminQuery = () => {
    return `INSERT INTO ${dbSchema}.${admin} (name, email, password, created_on, updated_on) VALUES (?, ?, ?, ?, ?)`
}

const updateAdminQuery = () => {
    return `UPDATE ${dbSchema}.${admin} SET name = ?, password = ?, updated_on = ? WHERE id = ? AND is_deleted = 0`
}

const selectAllAdminQuery = () => {
    return `SELECT id, name, email, created_on, updated_on FROM ${dbSchema}.${admin} WHERE is_deleted = 0 LIMIT ?, ?`
}

const selectOneAdminQuery = () => {
    return `SELECT id, name, email, password, created_on, updated_on FROM ${dbSchema}.${admin} WHERE id = ? AND is_deleted = 0`
}

const selectOneByEmailAdminQuery = () => {
    return `SELECT id, name, password FROM ${dbSchema}.${admin} WHERE email = ? AND is_deleted = 0`
}

// Exports ------------- Needed utmost as without these nothing will work
module.exports = {
    insertAdminQuery,
    updateAdminQuery,
    selectAllAdminQuery,
    selectOneAdminQuery,
    selectOneByEmailAdminQuery
}