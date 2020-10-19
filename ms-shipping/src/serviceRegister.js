const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    serviceName: 'ms-shipping',
    serviceId: 'ms-shipping',
    serviceNote: 'Shipping service',
    serviceTags: ['ship', 'shipping', 'amaz', 'microservice'],
    serviceHealthCheckHost: process.env.HEALTHCHECK_HOST,
    serviceHealthCheckPort: process.env.HEALTHCHECK_PORT,
    consulHost: process.env.CONSUL_HOST,
    consulPort: process.env.CONSUL_PORT
}