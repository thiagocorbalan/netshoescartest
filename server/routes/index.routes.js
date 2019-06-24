const express = require('express');
const router  = new express.Router();
module.exports = router;

router.use('/api/v1/products', require('./products.routes'));
