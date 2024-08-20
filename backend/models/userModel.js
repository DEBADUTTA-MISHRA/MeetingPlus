const { number, required } = require('joi');
const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            index: true
        },
        email: {
            type: String,
            validate: {
                validator: validator.isEmail,
                message: "{VALUE} is not a valid email",
            },
            required: true,
            index: true,
            unique: true
        },
        phone:{
            type:String,
            required:true
        },
        password: {
            type: String,
            required: true
        },
        organisation: {
            type: String,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true,
            index: true
        },
        otp: {
            type: String,
            default: null
        },
        otpExpiration: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
