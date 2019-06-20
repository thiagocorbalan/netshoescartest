const express = require('express');
const ProductsController =  require('../controllers/ProductsController');
const m = require('../helpers/middlewares')

const router  = new express.Router();

router.get('/', ProductsController.index );
router.get('/:id', m.mustBeInteger, ProductsController.detail);

module.exports = router;
