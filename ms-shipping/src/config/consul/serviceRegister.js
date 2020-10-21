const dotenv = require('dotenv');
dotenv.config();

const consul = require('consul');
const serviceRegister = require('./consul')(consul, {
    serviceName: 'ms-shipping',
    serviceId: 'ms-shipping',
    serviceNote: 'Shipping service',
    serviceTags: ['ship', 'shipping', 'amaz', 'microservice'],
    serviceHost: process.env.SERVICE_HOST,
    servicePort: process.env.NODE_PORT,
    consulHost: process.env.CONSUL_HOST,
    consulPort: process.env.CONSUL_PORT,
    registerIntervalTry: 3000,
    defaultsConfigurations: {
        MsShipping: `http://${process.env.SERVICE_HOST}:${process.env.NODE_PORT}`,
        ShippingCalculateUrl: process.env.ShippingCalculateUrl
    }
});

module.exports = serviceRegister;