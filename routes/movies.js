
const { Movie , validateMovie} =require('../model/movie');
const {Genre  } = require('../model/genre');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const movie = await Movie.find();
    if(!movie) return res.status(404).send("movie was not in record.");
    res.send(movie);
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if(!movie) return res.status(404).send("movie was not in record for given id");
    res.send(movie);
});

router.post('/', async (req, res) => {
    const { error } = validateMovie(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send("Invalid genre");
    let movie = new Movie({
        title : req.body.title,
        genre :{
           _id : genre._id,
            name : genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate : req.body.dailyRentalRate
    });

    await movie.save();
    res.send(movie);

});

router.put('/:id', async (req, res) => {
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send("Invalid genre");
    
    const movie = await Movie.findByIdAndUpdate(req.params.id,{
        title : req.body.title,
        genre :{
           _id : genre._id,
            name : genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate : req.body.dailyRentalRate
    }, {new: true});
    if(!movie) return res.status(400).send("Invalid Id");

    res.send(movie);
});

router.delete('/:id', async (req, res) =>{
    const movie =  await Movie.findByIdAndRemove(req.params.id);
    if(!movie) return res.status(400).send("Invalid Id");

    res.send(movie);
});

module.exports =router;