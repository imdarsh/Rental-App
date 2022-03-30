const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require('../utils');

const showCurrentUser = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });
    if(!user) {
      res.status(404).json({ message: "No user found" });
    }
    res.status(200).json({ user });
  };

const updateProfile = async (req, res) => {
  const { id: id } = req.params;
  const user = await User.findOneAndUpdate({ _id: id }, req.body);
  if(!user) {
    req.state(400).json({ message: 'User not found' });
  }
  res.status(200).json({ user });
}

const changePassword = async (req, res) => {
  const { id: id } = req.params;
  const { oldpassword, password } = req.body;
  
  const userdata = await User.findOne({ _id: id });  

  const isPasswordCorrect = await userdata.comparePassword(oldpassword);

    if(!isPasswordCorrect){
        return res.status(401).json({message: 'Invalid Credentials'});
    }


  const user = await User.findOneAndUpdate({ _id: id }, password);
  if(!user) {
    res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ message: 'success' });
}

module.exports = {
    showCurrentUser,
    updateProfile,
    changePassword
}