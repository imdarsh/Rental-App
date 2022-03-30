const express = require('express');
const router = express.Router();
const {
  changePassword,
  showCurrentUser,
  updateProfile
} = require('../controllers/userController');


router.route('/getUser-id/:id').get(showCurrentUser);
router.route('/update-profile/:id').patch(updateProfile);
router.route('/change-password/:id').patch(changePassword);


module.exports = router;
