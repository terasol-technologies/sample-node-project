/*
    Admin Services
    Created : 2021 by War
*/

// Some needed modules --------- trying removing one
const { createAdminModel, fetchSingleAdminModel, updateAdminModel, fetchSingleAdminEmailModel, fetchAdminModel } = require('../models/admin')
const { sign } = require('jsonwebtoken')
const { messages, generateHash } = require('../../utils/utility')
const { tokenDuration, users, authKey } = require('../../constants/config')
const { utc } = require('moment')

// Create
const createAdminService = async (name, email, password) => {
    const created_on = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    await createAdminModel(name, email, generateHash(password), created_on, created_on)
    return {
        status: 200,
        message: messages('success', 'adminCreate')
    }
}

// Update
const updateAdminService = async (id, name, password) => {
    const updated_on = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    const adminResponse = await fetchSingleAdminModel(id)
    if (adminResponse.length != 1)
        throw { status: 401, message: messages('errors', 'notFound') }
    name = name ? name : adminResponse[0].name
    password = password ? generateHash(password) : adminResponse[0].password
    await updateAdminModel(id, name, password, updated_on)
    return {
        status: 200,
        message: messages('success', 'adminUpdate')
    }
}

// Admin Authentication
const authenticateAdminService = async (email, password) => {
    const adminResponse = await fetchSingleAdminEmailModel(email)
    if (adminResponse.length != 1)
        throw { status: 401, message: messages('errors', 'notFound') }
    if (generateHash(password) != adminResponse[0].password)
        throw { status: 401, message: messages('errors', 'wrongPassword') }
    return {
        status: 200,
        data: {
            email: adminResponse[0].email,
            name: adminResponse[0].name,
            auth_key: sign({
                user: {
                    id: users.admin,
                    user_id: adminResponse[0].id,
                    email
                }
            }, authKey, {
                expiresIn: tokenDuration
            })
        }
    }
}

// Fetching List
const fetchAdminService = async (offset, limit) => {
    const responseData = await fetchAdminModel(offset, limit)
    let formattedData = responseData.map(element => ({
        ...element,
        created_on: utc(element.created_on).format('DD/MM/YYYY HH:mm'),
        updated_on: utc(element.updated_on).format('DD/MM/YYYY HH:mm')
    }))
    return {
        status: 200,
        data: formattedData
    }
}

// Fetching Single
const fetchSingleAdminService = async (id) => {
    const adminResponse = await fetchSingleAdminModel(id)
    if (adminResponse.length != 1)
        throw { status: 401, message: messages('errors', 'notFound') }
    let formattedData = adminResponse.map(element => ({
        ...element,
        created_on: utc(element.created_on).format('DD/MM/YYYY HH:mm'),
        updated_on: utc(element.updated_on).format('DD/MM/YYYY HH:mm')
    })).map(({ password, ...element }) => element)
    return {
        status: 200,
        data: formattedData[0]
    }
}

// Exports ------------- Needed utmost as without these nothing will work
module.exports = {
    createAdminService,
    updateAdminService,
    authenticateAdminService,
    fetchAdminService,
    fetchSingleAdminService
}