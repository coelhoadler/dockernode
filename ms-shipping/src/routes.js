const express = require('express');
const routes = express.Router();

const ShippingController = require('./controllers/ShippingController');
const HealthCheckController = require('./controllers/HealthCheckController');

routes.get(`/shipping/:userId`, ShippingController.calculate);
routes.get('/health', HealthCheckController.health);

module.exports = routes;