const Orders = require('../models/Orders');
const mongoose = require('mongoose');

const putOrders = async (req, res) => {
    const order = await Orders.create(req.body);
    res.status(201).json({ product });
}

module.exports = {
    putOrders
}