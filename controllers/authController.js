const User = require('../models/User');
const CustomError = require('../errors');
const { StatusCode } = require('http-status-codes'); 
const { attachCookiesToResponse, createTokenUser } = require('../utils');

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
    const role = isFirstAccount ? 'admin' : 'user';

    const user = await User.create({ name, email, contact, city, state, password, role });
    const tokenUser = createTokenUser(user);
    console.log(tokenUser);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCode.CREATED).json({ user: tokenUser });
}

module.exports = {
    register
}