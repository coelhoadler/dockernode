const express = require('express');
const routes = express.Router();

const ProductSearchController = require('./controllers/ProductSearchController');
const ProductController = require('./controllers/ProductController');
const ProductsCategoryController = require('./controllers/ProductsCategoryController');
const HealthCheckController = require('./controllers/HealthCheckController');

routes.get('/health', HealthCheckController.health);
routes.get(`/products/search`, ProductSearchController.index);
routes.get(`/products/:category`, ProductsCategoryController.index);
routes.get(`/product/:productId`, ProductController.index);

module.exports = routes;