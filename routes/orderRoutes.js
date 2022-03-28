const express = require('express');
const { putOrders, getOrders, myOrders } = require('../controllers/orderController');
const router = express.Router();

router.route('/orders/:id').get(getOrders).post(putOrders);
router.route('/myorders/:userId').get(myOrders);

module.exports = router;