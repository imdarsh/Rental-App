const express = require('express');
const router = express.Router();

const { register, login, logout } = require('../controllers/renterAuthController');

router.post('/renter/renter-register', register);
router.post('/renter/renter-login',login);
router.get('/renter/logout', logout);

module.exports = router;