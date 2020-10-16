const express = require('express');
const routes = express.Router();

const OrderController = require('./controllers/OrderController');
const HealthCheckController = require('./controllers/HealthCheckController');

routes.get(`/orders/:userId`, OrderController.index);
routes.get('/health', HealthCheckController.health);


module.exports = routes;