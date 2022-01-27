/*
    Admin Controllers
    Created : 2021 by War
*/

// Some needed modules --------- trying removing one
const { createAdminService, updateAdminService, authenticateAdminService, fetchAdminService, fetchSingleAdminService } = require('../services/admin')
const { requestHandler, logData } = require('../../utils/utility')
const { rowLimit } = require('../../constants/config')

// Module for create
const createAdminController = async (req, res) => {
    return await requestHandler(req, res, async () => {
        try {
            const { name, email, password } = req.body
            return await createAdminService(name, email, password)
        } catch (e) {
            logData(e)
            return e
        }
    })
}

// Module for update
const updateAdminController = async (req, res) => {
    return await requestHandler(req, res, async () => {
        try {
            const { name, password } = req.body
            const { id } = req.params
            return await updateAdminService(id, name, password)
        } catch (e) {
            logData(e)
            return e
        }
    })
}

// Module for authentication
const authenticateAdminController = async (req, res) => {
    return await requestHandler(req, res, async () => {
        try {
            const { email, password } = req.body
            return await authenticateAdminService(email, password)
        } catch (e) {
            logData(e)
            return e
        }
    })
}

// Module for fetching list
const fetchAdminController = async (req, res) => {
    return await requestHandler(req, res, async () => {
        try {
            const { o = 0, l = rowLimit } = req.query
            return await fetchAdminService(o, l)
        } catch (e) {
            logData(e)
            return e
        }
    })
}

// Module for fetching self
const fetchSelfAdminController = async (req, res) => {
    return await requestHandler(req, res, async () => {
        try {
            const { id } = req.user
            return await fetchSingleAdminService(id)
        } catch (e) {
            logData(e)
            return e
        }
    })
}

// Exports ------------- Needed utmost as without these nothing will work
module.exports = {
    createAdminController,
    updateAdminController,
    authenticateAdminController,
    fetchAdminController,
    fetchSelfAdminController
}