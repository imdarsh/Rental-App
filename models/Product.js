const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
      name: {
        type: String,
        trim: true,
        required: [true, 'Please provide product name'],
        maxlength: [100, 'Name can not be more than 100 characters'],
      },
      price: {
        type: [Number, "Please provide number"],
        required: [true, 'Please provide product price'],
        default: 0,
      },
      deposit: {
        type: [Number,"Please provide number"],
        required: [true, 'Please provide product price'],
        default: 0,
      },
      description: {
        type: String,
        required: [true, 'Please provide product description'],
        maxlength: [1000, 'Description can not be more than 1000 characters'],
      },
      image: {
        type: String
      },
      category: {
        type: String,
        enum: ['Furniture', 'Vehicle', 'Clothes','House','Electronics'],
      },
      userId: {
        type: String,
        trim: true,
        required: true
      },
      
}, { timestamps: true });

module.exports = mongoose.model('Product',ProductSchema);