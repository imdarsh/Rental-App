const Orders = require('../models/Orders');
const mongoose = require('mongoose');
const Product = require('../models/Product');

const putOrders = async (req, res) => {
    const order = await Orders.create(req.body);
    res.status(201).json({ order });
}

const getOrders = async (req, res) => {
    const order = await Orders.find({ _id: req.params.id});
    if(!order) {
        res.status(404).json({ message: "No Such Order" });
    }
    res.status(200).json({ order });
}

const myOrders = async (req, res) => {
    const { userId: userId } = req.params;
    const orders = await Orders.find({ 'userId': userId });
    const productsID = await Orders.find({ 'userId': userId }).select('productId -_id').distinct('productId');
    const products = await Product.find().where('_id').in(productsID).exec();
    if(!orders) {
        res.status(404).json({ message: 'Orders not found' });
    }
    res.status(200).json({ orders, products });
}

module.exports = {
    putOrders,
    getOrders,
    myOrders
}