
const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function(){
     mongoose.connect('mongodb://localhost/moviesRental')
    .then(() => winston.info('conneted to mongodb database successfully...'))
    

}