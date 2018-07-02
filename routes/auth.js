const {User} = require('../model/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

router.post('/', async (req,res) => {
    const {error }  = validate(req.body); 
    if(error) return res.status(400).send(error.details[0].message);

     let user =  await User.findOne({email: req.body.email});

     if(!user) return res.status(400).send("Invailid user id or password");

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if(!validPassword) return res.status(400).send("Invailid user id or password");

    res.send(true);

});

function validate(req){

    const schema ={
        email : Joi.string().min(5).max(255).required().email(),
        password : Joi.string().min(5).max(255).required()
    };
    return Joi.validate(req, schema);

}


module.exports= router;