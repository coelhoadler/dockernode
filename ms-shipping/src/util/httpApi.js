const axios = require('axios');

const httpApi = axios.create({
    baseURL: ''
});

module.exports = httpApi;