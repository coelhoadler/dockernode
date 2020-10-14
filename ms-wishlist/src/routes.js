const express = require('express');
const routes = express.Router();

const WishListController = require('./controllers/WishListController');

routes.get('/wishes/:userId', WishListController.index);
routes.post('/wishes', WishListController.create);

module.exports = routes;