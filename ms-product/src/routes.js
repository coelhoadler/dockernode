const express = require('express');
const routes = express.Router();

const ProductSearchController = require('./controllers/ProductSearchController');
const ProductMostSeenController = require('./controllers/ProductMostSeenController');
const ProductController = require('./controllers/ProductController');
const ProductsCategoryController = require('./controllers/ProductsCategoryController');

const endpoint = '/products/'

routes.get(`${endpoint}search`, ProductSearchController.index);
routes.get(`${endpoint}most-seen`, ProductMostSeenController.index);
routes.get(`${endpoint}:category`, ProductsCategoryController.index);
routes.get(`${endpoint}:productId`, ProductController.index);

module.exports = routes;