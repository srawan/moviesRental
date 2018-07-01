
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const rentalSchema = new mongoose.Schema({
    customer : {
        type : new mongoose.Schema({
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
        }),
        required : true,
    },
    movie :{
        type : new mongoose.Schema({
            title :{
                type :String,
                required :true,
                trim: true,
                minlength:3,
                maxlength: 255
            },
            
            dailyRentalRate :{
            type :Number,
            required :true,
            min : 0,
            max : 255
        }
        }),
        required : true,
    },
    dateOut :{
        type : Date,
        required : true,
        default : Date.now
    },
    dateReturn : {
        type : Date
    },
    rentalFee :{
        type : Number,
        min : 0,

    }
});
const Rental = mongoose.model("Rental", rentalSchema);

function validateRental(rental){
const schema = {
    customerId : Joi.objectId().required(),
    movieId :Joi.objectId().required()
};
return Joi.validate(rental, schema);
};

module.exports.Rental = Rental;
module.exports.rentalSchema = rentalSchema;
module.exports.validateRental = validateRental;