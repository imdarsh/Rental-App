const mongoose = require('mongoose');
const { validator } = require('validator');
const { default: isEmail } = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');

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
                validator: isEmail,
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
        address: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        role: {
            type: String,
            enum: ['admin', 'renter'],
            default: 'renter',
          },
    }, { timestamps: true }
);

UserSchema.pre('save', async function () {
    // console.log(this.modifiedPaths());
    // console.log(this.isModified('name'));
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
  UserSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
  };

module.exports = mongoose.model('User',UserSchema);
