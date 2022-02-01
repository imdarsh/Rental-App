const express = require('express');
const { getAllProducts, createProduct, getProduct } = require('../controllers/productController');
const router = express.Router();

router.route('/products').get(getAllProducts).post(createProduct);

router.route('/products/:id').get(getProduct);


module.exports = router;