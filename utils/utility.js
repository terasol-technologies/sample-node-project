/*
    Utility Functions for Project
    Created : 2021 by War
*/

// Some needed modules --------- trying removing one
const { validationResult } = require('express-validator')
const { createHash, createHmac, createCipheriv, createDecipheriv } = require('crypto')
const { existsSync, mkdirSync, writeFileSync, appendFileSync, unlink } = require('fs')
const { hashKey, otpLength, encryptKey, isDebug } = require('../constants/config')
const got = import('got')

// Essential Variables
const sym = 'abcdefghi56789'

// Log Data
const logData = (...args) => {
    if (isDebug) {
        console.log(args)
    }
}

// Cipher Variables
const resizedIV = Buffer.from(encryptKey, 'hex')
const cipherKey = createHash('sha256').update(hashKey).digest()

// Unique Identifier Generator
const guidGenerator = (length, prefix = '') => {
    let str = ''
    for (let index = 0; index < length; index++) {
        str += sym[parseInt(Math.random() * sym.length)]
    }
    return prefix ? (prefix + str) : str
}

// Generating Custom has for Text
const generateHash = (text, type = 'sha512') => {
    return createHmac(type, hashKey).update(text).digest('hex')
}

// Generating Random Number for OTP
const generateOTP = () => {
    let bufferZero = ''
    for (let index = 0; index < otpLength; index++) {
        bufferZero += '0'
    }
    return (bufferZero + parseInt(Math.random() * Math.pow(10, otpLength))).slice(-6)
}

// Token Generator
const tokenGenerator = () => {
    let prefix = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    let str = ''
    for (let index = 0; index < 6; index++) {
        str += sym[parseInt(Math.random() * sym.length)]
    }
    return createHmac('md5', hashKey).update(prefix + str).digest('hex')
}

// Message Locating
const messages = (process, point, language_resource = 'en-us') => {
    const languageResource = require('../language/' + language_resource)
    return languageResource[process][point]
}

// Writing Image Assets
const writeImage = (filePath, base64Image) => {
    let dirs = filePath.split('/')
    let dirPath = ''
    for (let index = 0; index < dirs.length - 1; index++) {
        dirPath += dirs[index]
        if (!existsSync(dirPath)) {
            mkdirSync(dirPath, null)
        }
        dirPath += '/'
    }
    writeFileSync(filePath, base64Image, { encoding: 'base64' }, (e) => { logData('Image Writing', e) })

}

// Writing Assets
const writeFile = (filePath, text) => {
    let dirs = filePath.split('/')
    let dirPath = ''
    for (let index = 0; index < dirs.length - 1; index++) {
        dirPath += dirs[index]
        if (!existsSync(dirPath)) {
            mkdirSync(dirPath, null)
        }
        dirPath += '/'
    }
    appendFileSync(filePath, text + '\n', (e) => { logData('File Writing', e) })
}

// Unlink Assets
const unlinkFile = (filePath) => {
    unlink(filePath, (e) => { logData('File Delete', e) })
}

// Controller Request Handler
const requestHandler = async (req, res, callback) => {
    try {
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(401).json({
                status: 401, message: errors.array()
            })
        }
        let data = await callback()
        return res.status(data.status).json(data)
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }
}

// GOT GET API Request
const requestGetAPI = async (api, authToken, extraHeaders = null) => {
    try {
        let headers = {
            Authorization: 'Bearer ' + authToken,
            'Content-Type': 'application/json',
        }

        if (extraHeaders) {
            headers = { ...headers, ...extraHeaders }
        }

        const { body } = await got.get(api, {
            responseType: 'json',
            headers: headers,
        })
        if (body.success) {
            return { data: body.data }
        } else {
            return { error: body.message }
        }
    } catch (e) {
        return { error: e }
    }
}

// GOT GET API Request with Params
const requestGetParamsAPI = async (api, authToken, params = {}, extraHeaders = null) => {
    try {
        let headers = {
            Authorization: 'Bearer ' + authToken,
            'Content-Type': 'application/json',
        }

        if (extraHeaders) {
            headers = { ...headers, ...extraHeaders }
        }

        let queryParams = '?'
        Object.keys(params).forEach((key) => {
            queryParams += key + '=' + encodeURIComponent(params[key]) + '&'
        })

        const { body } = await got.get(api + queryParams, {
            responseType: 'json',
            headers: headers,
        })
        if (body.success) {
            return body
        } else {
            return { error: body.message }
        }
    } catch (e) {
        return { error: e }
    }
}

// GOT GET Page Request
const requestGetPage = async (url) => {
    try {
        const response = await got(url)

        return {
            data: Buffer.from(Buffer.from(response.rawBody)).toString('base64'),
        }
    } catch (e) {
        return { data: '', error: e }
    }
}

// GOT POST API Request
const requestPostAPI = async (api, data, authToken) => {
    try {
        const { body } = await got.post(api, {
            json: data,
            responseType: 'json',
            headers: {
                Authorization: 'Bearer ' + authToken,
            },
        })
        if (body.success) {
            return { data: body.data }
        } else {
            return { error: body.message }
        }
    } catch (e) {
        return { error: e }
    }
}

// GOT DELETE API Request
const requestDeleteAPI = async (api, data, authToken) => {
    try {
        const { body } = await got.delete(api, {
            json: data,
            responseType: 'json',
            headers: {
                Authorization: 'Bearer ' + authToken,
            },
        })
        if (body.success) {
            return { data: body.data }
        } else {
            return { error: body.message }
        }
    } catch (e) {
        return { error: e }
    }
}

// Step Encryption
const dataEncryptor = (data) => {
    let temp_data = ''
    let index = 0, r_index = data.length - 1
    for (; index < r_index; index++, r_index--) {
        temp_data += data[index] + data[r_index]
    }
    if (index == r_index) {
        temp_data += data[index]
    }
    return temp_data
}

// Step Decryption
const dataDecrytor = (data) => {
    let temp_data = []
    let index = 0, e_index = 0
    for (; index < data.length - 1; index += 2, e_index++) {
        temp_data.splice(e_index, 0, data[index], data[index + 1])
    }
    if (index == data.length - 1) {
        temp_data.splice(e_index, 0, data[index])
    }
    temp_data = temp_data.join('')
    return temp_data
}

// Cipher Encryption
const cipherEncryptor = (data) => {
    let temp_data = ''
    try {
        const cipher = createCipheriv('aes256', cipherKey, resizedIV)
        temp_data = cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
    } catch (e) {
        temp_data = data
    }
    return temp_data
}

// Cipher Decryption
const cipherDecrytor = (data) => {
    let temp_data = ''
    try {
        const decipher = createDecipheriv('aes256', cipherKey, resizedIV)
        temp_data = decipher.update(data, 'hex', 'utf8') + decipher.final('utf8')
    } catch (e) {
        temp_data = data
    }
    return temp_data
}

// Generate QR Code
const generateQRCode = async (data) => {
    try {
        return await QRCode.toDataURL(data)
    } catch (e) {
        logData(JSON.stringify(e))
        return { error: e }
    }
}

// Lat Lng Distance Calculator
const distanceCalculator = (lat1, lon1, lat2, lon2, unit) => {
    let radlat1 = (Math.PI * lat1) / 180
    let radlat2 = (Math.PI * lat2) / 180
    let theta = lon1 - lon2
    let radtheta = (Math.PI * theta) / 180
    let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
    dist = Math.acos(dist)
    dist = (dist * 180) / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == 'K') {
        dist = dist * 1.609344
    } // KiloMeters
    if (unit == 'M') {
        dist = dist * 1.609344 * 1000
    } // Meters
    if (unit == 'N') {
        dist = dist * 0.8684
    } // Nautical Miles
    return dist
}

// Exports ------------- Needed utmost as without these nothing will work
module.exports = {
    logData,
    guidGenerator,
    generateHash,
    generateOTP,
    tokenGenerator,
    messages,
    writeImage,
    writeFile,
    unlinkFile,
    requestHandler,
    requestGetAPI,
    requestGetParamsAPI,
    requestPostAPI,
    requestDeleteAPI,
    requestGetPage,
    generateQRCode,
    dataEncryptor,
    dataDecrytor,
    cipherEncryptor,
    cipherDecrytor,
    distanceCalculator
}