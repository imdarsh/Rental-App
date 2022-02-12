const express = require('express');
const { getAllProducts, createProduct, getProduct, deleteProduct, updateProduct } = require('../controllers/productController');
const { update } = require('../models/Product');
const router = express.Router();

router.route('/products').get(getAllProducts).post(createProduct);

router.route('/products/:id').get(getProduct).delete(deleteProduct).patch(updateProduct);


module.exports = router;