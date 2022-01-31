const Product = require('../models/Product');
const mongoose = require('mongoose');

const getAllProducts = async (req,res) => {
    const product = await Product.find({});
    await res.status(200).json({product});
}

const createProduct = async (req,res) => {
    try{
        const product = await Product.create(req.body);
        res.status(200).json({ status: "Success", product });
        
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    getAllProducts,
    createProduct
}