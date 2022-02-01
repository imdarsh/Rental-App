const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true,'Please provide name'],
            minlength: 3,
            maxlength: [100, 'Name can not be more than 100 characters'],
        },
        email: {
            type: String,
            unique: true,
            required: [true,'Please provide email'],
            validate: {
                validator: validator.isEmail,
                message: 'Please provide valid email',
              },
        },
        contact: {
            type: Number,
            required: [true,'Please provide contact']
        },
        password: {
            type: String,
            required: [true, 'Please provide password'],
            minlength: 6
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
          },
    }, { timestamps: true }
);

module.exports = mongoose.model('User',UserSchema);
