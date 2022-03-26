const User = require('../models/User');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes'); 
const { attachCookiesToResponse, createTokenUser, createJWT } = require('../utils');
// const { use } = require('../routes/authRoutes');

const register = async (req, res) => {
    const { name, email, contact, address, city, state, password } = req.body;

    // Checking if email already exists
    const emailAlreadyExists = await User.findOne({ email }); 
    if(emailAlreadyExists){
        return res.status(401).json({message: 'User with email already found'});
    }

    // Checking if contact already exists
    const contactAlreadyExists = await User.findOne({ contact });
    if(contactAlreadyExists){
        return res.status(401).json({message: 'User with contact already found'});

    }

    // First User is admin by default
    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? 'admin' : 'user';

    const user = await User.create({ name, email, contact, address, city, state, password, role });
    const tokenUser = createTokenUser(user);
    const token = createJWT({ payload: tokenUser })
    res.status(200).json({ token: token, user: tokenUser });
}
const login = async (req,res) => {
    const { email, password, role } = req.body;

    if(!email || !password){
        return res.status(401).json({message: 'Please provide email and password'});
    }

    const user = await User.findOne({ email });

    if(!user){
        return res.status(401).json({message: 'Invalid Credentials'});
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if(!isPasswordCorrect){
        return res.status(401).json({message: 'Invalid Credentials'});
    }

    if(role !== 'user'){
        return res.status(401).json({ message: 'User does not exists' });
    }

    const tokenUser = createTokenUser(user);
    const token = createJWT({ payload: tokenUser })
    res.status(200).json({ token: token, user: tokenUser });
}

const logout = async (req,res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 1000),
      });
      res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
}

module.exports = {
    register,
    login,
    logout
}