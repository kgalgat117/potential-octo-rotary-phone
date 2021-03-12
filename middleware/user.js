var envs = require('../config/env')
var commonController = require('../controller/common')
var middlewares = {}
let timeRegex = new RegExp(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
let userModel = require('../model/user')

async function validateUser(req, res, next) {
    try {
        if (req.headers.authorization) {
            let token = req.headers.authorization.split(' ')[1]
            if (token) {
                let payload = commonController.validateToken(token)
                if (payload) {
                    req.user = await userModel.findOne({ nickName: payload.nickName, password: payload.password })
                    if (req.user) {
                        next()
                    } else {
                        res.status(401).json({ message: 'unauthorized request 2' })
                    }
                } else {
                    res.status(401).json({ message: 'unauthorized request 3' })
                }
            } else {
                res.status(401).json({ message: 'unauthorized request 4' })
            }
        } else {
            res.status(401).json({ message: 'unauthorized request 5' })
        }
    } catch (err) {
        res.status(400).json({ message: 'something went wrong 6' })
    }
}

async function validateCreateUserData(req, res, next) {
    try {
        if (!req.body.nickName) {
            return res.status(400).json({ message: "Invalid value for nickName" })
        }
        if (!req.body.password) {
            return res.status(400).json({ message: "Invalid value for password" })
        } else {
            req.body.encryptedPassword = commonController.encryptString(req.body.password)
        }
        req.user = await userModel.findOne({ nickName: req.body.nickName, password: req.body.encryptedPassword })
        if (!req.user) {
            req.user = await userModel.create({ nickName: req.body.nickName, password: req.body.encryptedPassword })
        }
        console.log(req.user)
        next()
    } catch (err) {
        res.status(400).json({ message: 'something went wrong 6' })
    }
}

function validateOnboardData(req, res, next) {
    try {
        if (req.body.problems && !Array.isArray(req.body.problems)) {
            return res.status(400).json({ message: "Invalid value for problems" })
        }
        if (req.body.sleepTime && !timeRegex.test(req.body.sleepTime)) {
            return res.status(400).json({ message: "Invalid value for sleepTime" })
        }
        if (req.body.wakeUpTime && !timeRegex.test(req.body.wakeUpTime)) {
            return res.status(400).json({ message: "Invalid value for wakeUpTime" })
        }
        if (req.body.sleepHours && typeof req.body.sleepHours != 'number') {
            return res.status(400).json({ message: "Invalid value for sleepHours" })
        }
        next()
    } catch (err) {
        res.status(400).json({ message: 'something went wrong 6' })
    }
}

middlewares.validateOnboardData = validateOnboardData
middlewares.validateCreateUserData = validateCreateUserData
middlewares.validateUser = validateUser

module.exports = middlewares