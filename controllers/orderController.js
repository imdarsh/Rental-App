const Orders = require('../models/Orders');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const putOrders = async (req, res) => {
    const instance = new Razorpay({
        key_id : process.env.RAZORPAY_KEYID,
        key_secret: process.env.RAZORPAY_KEYSECRET
    });

    const options = {
        // userId: req.body.userId,
        // productId: req.body.productId,
        amount: req.body.amount * 100,
        currency: 'INR',
        receipt: crypto.randomBytes(10).toString('hex')
    };

    await instance.orders.create(options,(error,order) => {
        if(error) {
            console.log(error);
            return res.status(500).json({ message: 'Something went wrong!' });
        }

        res.status(200).json({ order });

    })
    // const order = await Orders.create(req.body);
}

const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEYSECRET).update(sign.toString()).digest('hex');
    if(razorpay_signature === expectedSign) {
        return res.status(200).json({ message: 'Payment Verified Successfully' });
    }
    else{
        return res.status(400).json({ message: 'Invalid Signature Sent!' });
    }

}

const saveOrders = async (req,res) => {
    const order = await Orders.create(req.body);
    if(!order){
        return res.status(500).json({ message: 'Internal Error' });
    }
    res.status(200).json({ order });
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
    myOrders,
    verifyPayment,
    saveOrders
}