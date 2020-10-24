const dotenv = require('dotenv');
dotenv.config();

const consul = require('consul');
const serviceRegister = require('./consul')(consul, {
    serviceName: 'ms-product',
    serviceId: 'ms-product',
    serviceNote: 'Product Service',
    serviceTags: ['product', 'amaz', 'microservice'],
    serviceHost: process.env.SERVICE_HOST,
    servicePort: process.env.NODE_PORT,
    consulHost: process.env.CONSUL_HOST,
    consulPort: process.env.CONSUL_PORT,
    registerIntervalTry: 3000,
    defaultsConfigurations: {
        MsProduct: `http://${process.env.SERVICE_HOST}:${process.env.NODE_PORT}`
    }
});

module.exports = serviceRegister;