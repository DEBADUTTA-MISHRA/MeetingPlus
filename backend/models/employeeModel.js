const { number, required, boolean } = require('joi');
const mongoose = require('mongoose');
const validator = require('validator');

const employeeSchema = new mongoose.Schema(
    {
        empId:{
            type:String,
            required:true,
        },
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
        department:{
            type:String,
            required:true
        },
        designation: {
            type: String,
            required: true
        },
        isOrganizer:{
            type:Boolean,
            default:'false'
        },
        isActive: {
            type: Boolean,
            default: true,
            index: true
        },
    },
    {
        timestamps: true
    }
);

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
