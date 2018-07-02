const express = require('express');
const error = require('../middleware/error');
const customers = require('../routes/customers');
const genres = require('../routes/genres');
const movies = require('../routes/movies');
const rental = require('../routes/rental');
const users =require('../routes/users');
const auth = require('../routes/auth');


module.exports=function(app){
    app.use(express.json());
    app.use(express.urlencoded({extended : true}));
    app.use('/api/customers', customers);
    app.use('/api/genres', genres);
    app.use('/api/movies', movies);
    app.use('/api/rental', rental);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use(error);

}