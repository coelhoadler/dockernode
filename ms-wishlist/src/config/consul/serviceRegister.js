const dotenv = require('dotenv');
dotenv.config();

const consul = require('consul');
const serviceRegister = require('./consul')(consul, {
    serviceName: 'ms-wishlist',
    serviceId: 'ms-wishlist',
    serviceNote: 'wishlist service',
    serviceTags: ['wish', 'wishlist', 'amaz', 'microservice'],
    serviceHost: process.env.SERVICE_HOST,
    servicePort: process.env.NODE_PORT,
    consulHost: process.env.CONSUL_HOST,
    consulPort: process.env.CONSUL_PORT,
    registerIntervalTry: 3000,
    defaultsConfigurations: {
        MsWishlist: `http://${process.env.SERVICE_HOST}:${process.env.NODE_PORT}`
    }
});

module.exports = serviceRegister;