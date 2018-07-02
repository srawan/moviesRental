const winston = require('winston');
require('winston-mongodb');
const error = require('./middleware/error');
const express = require('express');
const config = require('config');
const app = express();
const customers = require('./routes/customers');
const genres = require('./routes/genres');
const movies = require('./routes/movies');
const rental = require('./routes/rental');
const users =require('./routes/users');
const auth = require('./routes/auth');

const mongoose = require('mongoose');

process.on('uncaughtException', (ex) => {
    //console.log('We got uncaughtException.');
   // winston.error(ex.message, err);
   // process.exit(1);
   throw ex;
});

winston.handleExceptions(new winston.transports.File({filename: 'uncaughtException.log'}));
    

process.on('unhandledRejection', (ex) => {
   // console.log('We got uncaughtException.');
    //winston.error(ex.message, err);
    //process.exit(1);
    throw ex;
});

mongoose.connect('mongodb://localhost/moviesRental')
.then(() => console.log('conneted to mongodb database successfully...'))
.catch(err => console.log('connection err is :', err));

winston.add(winston.transports.File, {filename :'logger.log'});
winston.add(winston.transports.MongoDB, {db: 'mongodb://localhost/moviesRental', label:'info'});

if(!config.get('jwtprivateKey')){
    console.log('Fatal Error: jwtprivatekey is not defined');
    process.exit(1);
}

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use('/api/customers', customers);
app.use('/api/genres', genres);
app.use('/api/movies', movies);
app.use('/api/rental', rental);
app.use('/api/users', users);
app.use('/api/auth', auth);


app.use(error);
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`app running on port number ${port}`));