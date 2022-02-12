const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes'); 
const { attachCookiesToResponse, createTokenUser } = require('../utils');
const Product = require('../models/Product');
const mongoose = require('mongoose');


// Get all products
const getAllProducts = async (req,res) => {
    const product = await Product.find({});
    res.status(StatusCodes.OK).json({product});
}


// Add product
const createProduct = async (req,res) => {
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({ status: "Success", product });   
}


// Get a single product
const getProduct = async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id});
    if (!product) {
        throw new CustomError.NotFoundError(`No product with id : ${productId}`);
    }
    res.status(StatusCodes.OK).json({ status: "Success", product });
}


// Delete a product
const deleteProduct = async (req, res) => {
    const { id: productId } = req.params;
  
    const product = await Product.findOne({ _id: productId });
  
    if (!product) {
      throw new CustomError.NotFoundError(`No product with id : ${productId}`);
    }
  
    await product.remove();
    res.status(StatusCodes.OK).json({ msg: 'Success! Product removed.' });
  };

  // Update a product
  const updateProduct = async (req, res) => {
    const { id: productId } = req.params;

    const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
      new: true,
      runValidators: true,
    });
  
    if (!product) {
      throw new CustomError.NotFoundError(`No product with id : ${productId}`);
    }
  
    res.status(StatusCodes.OK).json({ product });
  }
module.exports = {
    getAllProducts,
    createProduct,
    getProduct,
    deleteProduct,
    updateProduct
}