const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    productId: {
        type: String,
    },
    total: {
        type: [Number, "Please provide a number"]
    }
}, { timestamps: true });

module.exports = mongoose.model('Orders', OrderSchema);