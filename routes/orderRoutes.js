const express = require('express');
const { putOrder } = require('../controllers/orderController');
const { order } = require('../models/Orders');
const router = express.Router();

router.route('/orders/:id').post(putOrder);

module.exports = router;