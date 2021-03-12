const axios = require('axios').default
var globals = require('./globals').globals

var url = globals.SERVER_URL + '/api'

function updateProblems(data) {
    return axios.post(`${url}/user/onboard`, data, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
}

function login(data) {
    return axios.post(`${url}/user/create`, data)
}

function validateUser() {
    return axios.get(`${url}/validate/token`, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
}

export {
    login,
    validateUser,
    updateProblems
}