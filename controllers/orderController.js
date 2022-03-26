const Orders = require('../models/Orders');
const mongoose = require('mongoose');

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

module.exports = {
    putOrders,
    getOrders
}