const express = require('express');
const router = express.Router();
const {
  showCurrentUser,
} = require('../controllers/userController');


router.route('/getUser-id/:id').get(showCurrentUser);


module.exports = router;
