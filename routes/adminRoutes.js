const express = require('express');
const router = express.Router();

router.route('/admin').get(getAllProducts);


module.exports = router;