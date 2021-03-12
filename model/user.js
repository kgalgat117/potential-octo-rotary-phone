var mongoose = require('mongoose')
var DB = require('../config/db')

var schema = new mongoose.Schema({
    nickName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    problems: { type: [String], enum: ["sleep_easily", "sleep_through_night", "wake_on_time"] },
    duration: { type: String, },
    sleepTime: { type: String, },
    wakeUpTime: { type: String, },
    sleepHours: { type: Number, },
    sleepScore: { type: Number, }
}, { timestamps: true })

module.exports = DB.model('users', schema)