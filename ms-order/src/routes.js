const express = require('express');
const routes = express.Router();

const OrderController = require('./controllers/OrderController');
const DoOrderController = require('./controllers/DoOrderController');
const HealthCheckController = require('./controllers/HealthCheckController');

routes.get(`/orders/:userId`, OrderController.index);
routes.get(`/orders/my-orders/:userId`, OrderController.index);
routes.post(`/order/do-order`, DoOrderController.store);

routes.get('/health', HealthCheckController.health);


module.exports = routes;