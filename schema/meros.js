// define modules
const Joi = require('joi');
const mongoose = require('mongoose');

// define schema
const Mero = mongoose.model('Mero', mongoose.Schema({
    partNumber: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 25
    },
    description: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 75
    },
    processes: { 
        type: Array,
        require: true,
    },
    date: { type: Date, 
        default: () => Date.now() - 6*60*60*1000
    }
}));

// function to validate orders
function validateMero(mero) {
    const schema = {
        partNumber: Joi.string().min(5).max(20).required(),
        description: Joi.string().min(5).max(75).required(),
        processes: Joi.array().required()
    };
    return Joi.validate(mero, schema);
}

module.exports.Mero = Mero;
module.exports.validateMero = validateMero;