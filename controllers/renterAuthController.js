const User = require('../models/User');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes'); 
const { attachCookiesToResponse, createTokenUser, createJWT } = require('../utils');
// const { use } = require('../routes/authRoutes');

const register = async (req, res) => {
    const { name, email, contact, city, state, password } = req.body;

    // Checking if email already exists
    const emailAlreadyExists = await User.findOne({ email }); 
    if(emailAlreadyExists){
        throw new CustomError.BadRequestError('Email already exists');
    }

    // Checking if contact already exists
    const contactAlreadyExists = await User.findOne({ contact });
    if(contactAlreadyExists){
        throw new CustomError.BadRequestError('Contact already exists');
    }

    // First User is admin by default
    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? 'admin' : 'renter';

    const user = await User.create({ name, email, contact, city, state, password, role });
    const tokenUser = createTokenUser(user);
    console.log(tokenUser);
    const token = createJWT({ payload: tokenUser })
    // attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.CREATED).json({ token: token, user: tokenUser });
}

const login = async (req,res) => {
    const { email, password } = req.body;

    if(!email || !password){
        throw new CustomError.BadRequestError('Please provide email and password');
    }

    const user = await User.findOne({ email });

    if(!user){
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if(!isPasswordCorrect){
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }

    const tokenUser = createTokenUser(user);
    // attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.OK).json({ user: tokenUser });
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