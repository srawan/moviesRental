const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        minlength:3,
        maxlength :255 
    },
    address:{
        type:String,
        required: true
    },
    phone : {
        type :Number,
        required: true
    },
    isGold :{
       type: Boolean,
    default : false
    }
});


const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(customer){

    const schema ={
        name :Joi.string().min(3).max(255).required(),
        address : Joi.string().required(),
        phone: Joi.number().required(),
        isGold :Joi.boolean()
    
    };
    return Joi.validate(customer, schema);
};

module.exports.Customer =Customer;
module.exports.customerSchema = customerSchema;
module.exports.validateCustomer =validateCustomer;