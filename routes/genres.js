const {Genre, validateGenre} = require('../model/genre');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const genre =  await Genre.find();
    if(!genre) {
        return res.status(200).send('genre data is not available in db');
    }
    res.send(genre);

} );
router.get('/:id',   async (req, res)=> {
    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send("genre was not found with given id");

    res.send(genre);


});

router.post('/', async (req, res) => {
    
    const genre = new Genre({
        name : req.body.name
    });
    const {error } = validateGenre(genre);
    if(error) return res.status(400).send(error.details[0].message);
   await genre.save();
    res.send(genre);
});
router.put('/:id', async (req, res)=> {
    const genre =  await Genre.findByIdAndUpdate(req.params.id, {name : req.body.name});
    if(!genre) return res.status(404).send("genre was not found with given id");

    res.send(genre);
});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if(!genre) return res.status(404).send("genre was not found with given id");

    res.send(genre);
});


module.exports =router;