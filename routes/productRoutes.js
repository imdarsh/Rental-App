const express = require('express');
const { getAllProducts, createProduct, getProduct, deleteProduct, updateProduct, getProductByUserId } = require('../controllers/productController');
// const { update } = require('../models/Product');
const router = express.Router();

router.route('/products').get(getAllProducts).post(createProduct);

router.route('/products/:id').get(getProduct).delete(deleteProduct).patch(updateProduct);

router.route('/show-products/:userId').get(getProductByUserId);


module.exports = router;