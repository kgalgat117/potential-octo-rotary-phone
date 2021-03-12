var jsonwebtoken = require('jsonwebtoken')
var bcrypt = require('bcryptjs');
var envs = require('../config/env')

var commons = {}

function someAlgorithmReturnsEfficiencyBasedOnData(data) {
    return Math.floor(Math.random() * (100 - 1 + 1) + 1);
}

function encryptString(string) {
    return bcrypt.hashSync(string, envs.BCRYPT_SALT);
}

function compareEncryptedString(string, hash) {
    return bcrypt.compareSync(string, hash);
}

function createAccessToken(payload) {
    return jsonwebtoken.sign(payload, envs.JWT_ACCESS_TOKEN_PRIVATE_KEY, { issuer: envs.JWT_ISSUER, audience: envs.JWT_ACCESS_TOKEN_AUDIENCE, expiresIn: envs.JWT_ACCESS_TOKEN_EXPIRE })
}

function validateToken(token) {
    let payload = null
    try {
        payload = jsonwebtoken.verify(token, envs.JWT_ACCESS_TOKEN_PRIVATE_KEY, { issuer: envs.JWT_ISSUER, audience: envs.JWT_ACCESS_TOKEN_AUDIENCE, ignoreExpiration: true })
    } catch (catchError) {
        payload = null
    }
    return payload
}

commons.createAccessToken = createAccessToken
commons.validateToken = validateToken
commons.encryptString = encryptString
commons.compareEncryptedString = compareEncryptedString

commons.someAlgorithmReturnsEfficiencyBasedOnData = someAlgorithmReturnsEfficiencyBasedOnData

module.exports = commons