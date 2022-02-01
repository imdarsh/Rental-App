const User = require('../models/User');
const CustomError = require('../errors');

const register = async (req, res) => {
    const { email, contact, password } = req.body;

    // Checking if email already exists
    const emailAlreadyExists = await User.find({ email }); 
    if(emailAlreadyExists){
        throw new CustomError.BadRequestError('Email already exists');
    }

    // Checking if contact already exists
    const contactAlreadyExists = await User.find({ contact });
    if(contactAlreadyExists){
        throw new CustomError.BadRequestError('Contact already exists');
    }
}

module.exports = {
    register,
    login,
    logout
}