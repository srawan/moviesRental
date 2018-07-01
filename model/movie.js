const mongoose = require('mongoose');
const {genreSchema} = require('./genre');
const Joi = require('joi');

const movieSchema = new mongoose.Schema({
    title :{
        type :String,
        required :true,
        trim: true,
        minlength:3,
        maxlength: 255
    },
    genre : {
        type :genreSchema,
        required :true
    },
numberInStock : {
    type: Number,
    required :true,
    min :0,
    max : 255
},
dailyRentalRate :{
    type :Number,
    required :true,
    min : 0,
    max : 255
}


});

const Movie = mongoose.model("Movie", movieSchema);

function validateMovie(movie){
    const schema ={
        title :Joi.string().min(3).max(255).required(),
        genreId:Joi.string().required(),
        numberInStock : Joi.number().required(),
        dailyRentalRate : Joi.number().required()

    };

    return Joi.validate(movie, schema);

}

module.exports.movieSchema = movieSchema;
module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;