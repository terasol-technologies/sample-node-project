/*
    Project Configuration
    Created : 2021 by War
*/

// Some needed modules --------- trying removing one
require('dotenv').config()

// Exports ------------- Needed utmost as without these nothing will work
module.exports = {
    serverUrl: process.env.SERVER_URL,
    port: process.env.PORT,
    isDebug: process.env.DEBUG,
    appName: process.env.APP_NAME,
    authKey: 'auth_key',
    users: {
        admin: 'Administrator'
    },
    dbSchema: process.env.MYSQLDATABASE,
    mysqlHost: process.env.MYSQLHOST,
    mysqlUser: process.env.MYSQLUSER,
    mysqlDatabase: process.env.MYSQLDATABASE,
    mysqlPassword: process.env.MYSQLPASSWORD,
    mysqlPoolLimit: process.env.MYSQLPOOLLIMIT,
    mysqlTimezone: process.env.MYSQLTIMEZONE,
    rowLimit: 10000,
    hashKey: process.env.HASH_KEY,
    encryptKey: process.env.ENCRYPT_KEY,
    otpLength: process.env.OTP_LENGTH,
    otpDuration: process.env.OTP_DURATION,
    tokenDuration: process.env.TOKEN_DURATION,
    uploadDir: process.env.UPLOAD_DIR,
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    smtpUser: process.env.SMTP_USER,
    smtpPassword: process.env.SMTP_PASSWORD,
    smtpFrom: process.env.SMTP_FROM,
    smtpFromEmail: process.env.SMTP_FROM_EMAIL
}