# moviesRental
This repository has all  API written using node.js, express.js,  mongodb, mongoose and joi.
This project written using Nodejs(8.11.3), Expressjs, mongodb, mongoose and Joi. 
this app give us good understanding to:- 
how to create API using nodejs/express? 
how to connect to mongodb? 
how to validate user input and return meaning full message to usr? 
how to autherization & Authenticate to user for access? how to implement two phase commit in mongodb?

how to run this app?
    1:- clone this app.
    2:- install npm . using command (npm install).
    3:- set the set the private key :  export movieRental_privateKey=mysecretkey ( on mac), or  set movieRental_privateKey=mysecretkey for window.
    4:- run for console using command : node app.js.

    how to test ?

    1:- Open the postman.
    2:- set the get command and enter the following url :-

    for getting  customers : '/api/customers', '/api/customers/id'
    for getting  genres :  '/api/genres'
    for getting  movies : '/api/movies'
   for getting  rental :  '/api/rental'
    for getting  users :'/api/users'
    for getting  auth : '/api/auth'
and so on.... for get by id add id like  '/api/customers/id', 

Note : Assuming that already install and configered nodejs, mongodb and properly running.

