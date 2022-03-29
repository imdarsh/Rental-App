const express = require('express');
const router = express.Router();
const {
  showCurrentUser,
  updateProfile
} = require('../controllers/userController');


router.route('/getUser-id/:id').get(showCurrentUser);
router.route('/update-profile/:id').patch(updateProfile);


module.exports = router;
