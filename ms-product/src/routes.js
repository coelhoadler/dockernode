const express = require('express');
const routes = express.Router();

const ProductController = require('./controllers/ProductController');
const ProductsCategoryController = require('./controllers/ProductsCategoryController');

routes.get('/products/:category', ProductsCategoryController.index);
routes.get('/product/:productId', ProductController.index);

module.exports = routes;