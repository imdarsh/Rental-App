const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    productId: {
        type: String,
    },
    total: {
        type: [Number, "Please provide number"],
        required: [true, 'Please provide total'],
        default: 0,
    }
}, { timestamps: true });

module.exports = mongoose.model('Orders', OrderSchema);