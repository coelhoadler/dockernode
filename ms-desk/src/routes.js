const express = require('express');
const routes = express.Router();

const DeskController = require('./controllers/DeskController');

routes.get('/desks', DeskController.index);
routes.post('/desk', DeskController.create);

module.exports = routes;