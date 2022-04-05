const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    productId: {
        type: String,
    },
    receipt: {
        type: String,
    },
    currency: {
        type: String,
    },
    total: {
        type: [Number, "Please provide number"],
        required: [true, 'Please provide total'],
        default: 0,
    },
    status: {
        type: String,
        required: true,
        default: 'Ordered'
    }
}, { timestamps: true });

module.exports = mongoose.model('Orders', OrderSchema);