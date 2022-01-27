/*
    Admin Model
    Created : 2021 by War
*/

// Some needed modules --------- trying removing one
const { processQuery } = require('../../constants/db')
const { selectOneByEmailAdminQuery, insertAdminQuery, selectAllAdminQuery, selectOneAdminQuery, updateAdminQuery } = require('../queries/admin')
const { messages, cipherEncryptor, cipherDecrytor } = require('../../utils/utility')

// Create
const createAdminModel = async (name, email, password, created_on, updated_on) => {
    name = cipherEncryptor(name)
    email = cipherEncryptor(email)
    const response = await processQuery({
        text: selectOneByEmailAdminQuery(),
        values: [email]
    })
    if (response.length != 0)
        throw { status: 401, message: messages('errors', 'alreadyExist') }
    try {
        const query = {
            text: insertAdminQuery(),
            values: [name, email, password, created_on, updated_on]
        }
        return await processQuery(query)
    } catch (e) {
        throw { status: 401, message: messages('errors', 'dbInsert') }
    }
}

// Update
const updateAdminModel = async (id, name, password, updated_on) => {
    name = cipherEncryptor(name)
    try {
        const query = {
            text: updateAdminQuery(),
            values: [name, password, updated_on, id]
        }
        return await processQuery(query)
    } catch (e) {
        throw { status: 401, message: messages('errors', 'dbUpdate') }
    }
}

// Fetch List
const fetchAdminModel = async (offset, limit) => {
    try {
        const query = {
            text: selectAllAdminQuery(),
            values: [offset, limit]
        }
        let response = await processQuery(query)
        return response.map(e => ({
            ...e,
            name: cipherDecrytor(e.name),
            email: cipherDecrytor(e.email)
        }))
    } catch (e) {
        throw { status: 401, message: messages('errors', 'dbSelect') }
    }
}

// Fetch Single
const fetchSingleAdminModel = async (id) => {
    try {
        const query = {
            text: selectOneAdminQuery(),
            values: [id]
        }
        return (await processQuery(query)).map(e => ({
            ...e,
            name: cipherDecrytor(e.name),
            email: cipherDecrytor(e.email)
        }))
    } catch (e) {
        throw { status: 401, message: messages('errors', 'dbSelect') }
    }
}

// Fetch Single Email
const fetchSingleAdminEmailModel = async (email) => {
    email = cipherEncryptor(email)
    try {
        const query = {
            text: selectOneByEmailAdminQuery(),
            values: [email]
        }
        return (await processQuery(query)).map(e => ({
            ...e,
            name: cipherDecrytor(e.name)
        }))
    } catch (e) {
        throw { status: 401, message: messages('errors', 'dbSelect') }
    }
}

// Exports ------------- Needed utmost as without these nothing will work
module.exports = {
    createAdminModel,
    updateAdminModel,
    fetchAdminModel,
    fetchSingleAdminModel,
    fetchSingleAdminEmailModel
}