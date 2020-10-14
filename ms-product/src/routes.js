const express = require('express');
const routes = express.Router();

const ProductSearchController = require('./controllers/ProductSearchController');
const ProductMostSeenController = require('./controllers/ProductMostSeenController');
const ProductController = require('./controllers/ProductController');
const ProductsCategoryController = require('./controllers/ProductsCategoryController');

routes.get(`/products/search`, ProductSearchController.index);
routes.get(`/products/most-seen`, ProductMostSeenController.index);
routes.get(`/products/:category`, ProductsCategoryController.index);
routes.get(`/product/:productId`, ProductController.index);

module.exports = routes;