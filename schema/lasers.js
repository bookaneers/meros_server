// define modules
const Joi = require('joi');
const mongoose = require('mongoose');

// define schema
const Laser = mongoose.model('Laser', mongoose.Schema({
    type: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 20
    },
    program: {
        type: String, 
        // required: true,
        // minlength: 2,
        maxlength: 10
    },
    material: { 
        type: String, 
        // required: true,
        // minlength: 5,
        maxlength: 20
    },
    size: { 
        type: String, 
        // required: true,
        // minlength: 5,
        maxlength: 20
    },
    takt: { 
        type: String,
        // require: true,
        // min:1,
        maxlength: 8
    },
    status: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 20
    },
    notes: {
        type: String, 
        // required: true,
        // maxlength:1,
        maxlength:50
    },
    releaseDate: { type: Date
    },
    dayOfTheWeek: { type: Number
    }

}));

// function to validate orders
function validateLaser(laser) {
    const schema = {
        type: Joi.string().min(5).max(20).required(),
        program: Joi.string().max(10),
        material: Joi.string().max(20),
        size: Joi.string().max(20),
        takt: Joi.string().max(8),
        status: Joi.string().min(3).max(20).required(),
        notes: Joi.string().max(50),
    };
    return Joi.validate(laser, schema);
}

module.exports.Laser = Laser;
module.exports.validateLaser = validateLaser;