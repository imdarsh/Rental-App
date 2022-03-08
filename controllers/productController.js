const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes'); 
const { attachCookiesToResponse, createTokenUser } = require('../utils');
const Product = require('../models/Product');
const mongoose = require('mongoose');
const fs = require('fs');
const { sendFile } = require('express/lib/response');


// Get all products
const getAllProducts = async (req,res) => {
    const product = await Product.find({});
    res.status(200).json({product});
}



// Add product
const createProduct = async (req,res) => {
  
  // Validation
  if (!req.files) {
    return res.status(400).json({message: 'No files were uploaded.'});
  }
  if(isNaN(req.body.price)){
    return res.status(400).json({message: 'Rent should be a Number'});
  }
  if(isNaN(req.body.deposit)){
    return res.status(400).json({message: 'Deposit should be a Number'});
  }
  
  // Image Uploading
  let img = req.files.image;
  imgfilename = new Date().getTime() +'_'+img.name;
  img.mv(`./uploads/${imgfilename}`);
  req.body.image = imgfilename;
  
  const product = await Product.create(req.body);
  res.status(200).json({ status: "Success", product });   
}


// Get a single product
const getProduct = async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id});
    if (!product) {
        return res.status(404).json({ message: "No Product Found" });
    }
    res.status(200).json({ status: "Success", product });
}


// Delete a product
const deleteProduct = async (req, res) => {
    const { id: productId } = req.params;
    
    const product = await Product.findOne({ _id: productId });
  
    if (!product) {
      res.status(400).json({ message: 'Product Not Found' })
    }
  
    await product.remove();
    res.status(200).json({ message: 'Success! Product removed.' });
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
  
    res.status(200).json({ product });
  }

  // Get product by user ID
  const getProductByUserId = async (req, res) => {
    const { userId: userId } = req.params;
    const products = await Product.find({ 'userId': userId });
    if(!products) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ products })
  }


module.exports = {
    getAllProducts,
    createProduct,
    getProduct,
    deleteProduct,
    updateProduct,
    getProductByUserId
}