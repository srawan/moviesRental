
require('express-async-errors');
const {Genre, validateGenre} = require('../model/genre');
const auths = require('../middleware/auths');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
     
    const genre =  await Genre.find();  
    res.send(genre);
    
} );
router.get('/:id',   async (req, res)=> {
    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send("genre was not found with given id");

    res.send(genre);


});

router.post('/', auths, async (req, res) => {
    const {error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const genre = new Genre({
        name : req.body.name
    });
    
   await genre.save();
    res.send(genre);
});
router.put('/:id', async (req, res)=> {
    const genre =  await Genre.findByIdAndUpdate(req.params.id, {name : req.body.name});
    if(!genre) return res.status(404).send("genre was not found with given id");

    res.send(genre);
});

router.delete('/:id',[auths, admin], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if(!genre) return res.status(404).send("genre was not found with given id");

    res.send(genre);
});


module.exports =router;