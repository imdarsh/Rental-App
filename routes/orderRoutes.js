const express = require('express');
const { putOrders, getOrders } = require('../controllers/orderController');
const router = express.Router();

router.route('/orders/:id').get(getOrders).post(putOrders);

module.exports = router;