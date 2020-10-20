const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    serviceName: 'ms-order',
    serviceId: 'ms-order',
    serviceNote: 'Orders service',
    serviceTags: ['order', 'orders', 'amaz', 'microservice'],
    serviceHost: process.env.SERVICE_HOST,
    servicePort: process.env.SERVICE_PORT,
    consulHost: process.env.CONSUL_HOST,
    consulPort: process.env.CONSUL_PORT,
    registerIntervalTry: 3000,
    defaultsConfigurations: {
        MsOrder: `http://${process.env.SERVICE_HOST}:${process.env.SERVICE_PORT}`
    }
}