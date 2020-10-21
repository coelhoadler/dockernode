const express = require('express');
const routes = express.Router();

const DeskController = require('./controllers/DeskController');
const HealthCheckController = require('./controllers/HealthCheckController');

routes.get('/health', HealthCheckController.health);
routes.get('/desks', DeskController.index);
routes.post('/desk', DeskController.create);

module.exports = routes;