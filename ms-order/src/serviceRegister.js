const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    serviceName: 'ms-order',
    serviceId: 'ms-order',
    serviceNote: 'Orders service',
    serviceTags: ['order', 'orders', 'amaz', 'microservice'],
    serviceHealthCheckHost: process.env.HEALTHCHECK_HOST,
    serviceHealthCheckPort: process.env.HEALTHCHECK_PORT,
    consulHost: process.env.CONSUL_HOST,
    consulPort: process.env.CONSUL_PORT
}