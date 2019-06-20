const express = require('express');

const routes = new express.Router();

routes.get('/products', ProductsController.index );
routes.get('/products/:id', ProductsController.detail);

module.exports = routes;
