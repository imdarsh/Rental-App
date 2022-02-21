const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require('../utils');

const showCurrentUser = async (req, res) => {
    console.log(req.user);
    res.status(StatusCodes.OK).json({ user: req.user });
  };


module.exports = {
    showCurrentUser
}