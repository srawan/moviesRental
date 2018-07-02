const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports=function(){
    process.on('uncaughtException', (ex) => {
        throw ex;
     });
     winston.handleExceptions(
         new winston.transports.Console({colorize: true, prettyPrint : true}),
         new winston.transports.File({filename: 'uncaughtException.log'}));
     process.on('unhandledRejection', (ex) => {
         throw ex;
     });
     winston.add(winston.transports.File, {filename :'logger.log'});
     winston.add(winston.transports.MongoDB, {db: 'mongodb://localhost/moviesRental', label:'info'});
}