
const {Rental, validateRental} = require('../model/rental');
const {Customer } = require('../model/customer');
const {Movie } = require('../model/movie');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fawn = require('fawn');

fawn.init(mongoose);
router.get('/', async (req, res)=> {
    const rental = await Rental.find();
    res.send(rental);
});

router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    if(!rental) return res.status(404).send("invailid id");
    res.send(rental);
});

router.post('/', async (req, res) => {
    const {error } = validateRental(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(404).send("customer was not found with given id");

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(404).send("movie was not in record for given id");

    let rental = new Rental({
        customer:{
            _id : customer._id,
            name : customer.name,
            address: customer.address,
            phone: customer.phone,
            isGold : customer.isGold
        },
        movie :{ 
            _id : movie._id,
            title: movie.title ,
            dailyRentalRate: movie.dailyRentalRate,
        },
            dateOut: req.body.dateOut,
            dateReturn: req.body.dateReturn,
            rentalFee : req.body.rentalFee
    });
    
    try{
        new fawn.Task()
        .save('rentals', rental)
        .update('movies', {_id : movie._id}, {$inc: {numberInStock:-1}})
        .run();

    res.send(rental);
    } catch(ex){
        res.status(500).send(ex.message);
    }
        
});
router.put('/:id', async (req, res) => {
    const {error } = validateRental(req.body);
    
    if(error) return res.status(400).send(error.details[0].message);

    let rental = await Rental.findByIdAndUpdate(req.params.id, {
    customer:{
        _id : customer._id,
        name : customer.name,
        address: customer.address,
        phone: customer.phone,
        isGold : customer.isGold
    },
    movie :{ 
        _id : movie._id,
        title: movie.title ,
        dailyRentalRate: movie.dailyRentalRate,
    },
        dateOut: req.body.dateOut,
        dateReturn: req.body.dateReturn,
        rentalFee : req.body.rentalFee

    });

    if(!rental) return res.status(404).send("Rental was not found by given id");

    res.send(rental);
});

router.delete('/:id', async (req, res) => {
    let rental = await Rental.findOneAndRemove(req.params.id);
    if(!rental) return res.status(404).send("Rental was not found by given id");

    res.send(rental);

});


module.exports =router;