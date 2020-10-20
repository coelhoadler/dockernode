const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    serviceName: 'ms-shipping',
    serviceId: 'ms-shipping',
    serviceNote: 'Shipping service',
    serviceTags: ['ship', 'shipping', 'amaz', 'microservice'],
    serviceHost: process.env.SERVICE_HOST,
    servicePort: process.env.SERVICE_PORT,
    consulHost: process.env.CONSUL_HOST,
    consulPort: process.env.CONSUL_PORT,
    registerIntervalTry: 3000,
    defaultsConfigurations: {
        MsShipping: `http://${process.env.SERVICE_HOST}:${process.env.SERVICE_PORT}`,
        ShippingCalculateUrl: process.env.ShippingCalculateUrl
    }
}