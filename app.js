const express = require('express');

const app = express();
const customers = require('./routes/customers');
const genres = require('./routes/genres');
const movies = require('./routes/movies');
const rental = require('./routes/rental');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/moviesRental')
.then(() => console.log('conneted to mongodb database successfully...'))
.catch(err => console.log('connection err is :', err));

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use('/api/customers', customers);
app.use('/api/genres', genres);
app.use('/api/movies', movies);
app.use('/api/rental', rental);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`app running on port number ${port}`));