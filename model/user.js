const config = require('config');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required : true,
        minlength : 5,
        maxlength : 50
    },
    email : {
        type:String,
        required : true,
        minlength : 5,
        maxlength : 255,
        unique :true
    },
    password: {
        type:String,
        required : true,
        minlength : 5,
        maxlength : 1024
    }
});

userSchema.methods.generateAuthToken= function generateAuthToken(){
    const token = jwt.sign({_id : this._id}, config.get("jwtprivateKey"));
    return token;
}
const User = mongoose.model('User', userSchema);


function validateUser(user){

    const schema ={
        name : Joi.string().min(5).max(50).required(),
        email : Joi.string().min(5).max(255).required().email(),
        password : Joi.string().min(5).max(255).required()
    };
    return Joi.validate(user, schema);

}

module.exports.User = User;
module.exports.userSchema =userSchema;
module.exports.validateUser = validateUser;