const express = require('express');
const { putOrders, getOrders, myOrders, verifyPayment, saveOrders } = require('../controllers/orderController');
const router = express.Router();

router.route('/orders/:id').get(getOrders).post(putOrders);
router.route('/myorders/:userId').get(myOrders);
router.route('/payment/verify').post(verifyPayment);
router.route('/save-order').post(saveOrders);

module.exports = router;