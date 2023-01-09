// define modules
const Joi = require('joi');
const mongoose = require('mongoose');

// define schema
const Duler = mongoose.model('Duler', mongoose.Schema({
    salesOrder: {
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 5
    },
    customer: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 40
    },
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
    quantity: { 
        type: Number,
        require: true,
        min:1,
        max:250
    },
    typeOfCard: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 20
    },
    cardPriority: {
        type: Number, 
        required: true,
        min:1,
        max:3
    },
    qrCode: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 25
    },
    department: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 25
    },
    status: {
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 20
    },
    currentProcess: {
        type: Number, 
        required: true,
        min:0,
        max:15
    },
    releaseDate: { type: Date, 
        default: () => Date.now() - 6*60*60*1000
    }
}));

// function to validate orders
function validateDuler(duler) {
    const schema = {
        salesOrder: Joi.string().min(3).max(5).required(),
        customer: Joi.string().min(5).max(40).required(),

        partNumber: Joi.string().min(5).max(20).required(),
        description: Joi.string().min(5).max(75).required(),
        processes: Joi.array().required(),

        quantity: Joi.number().min(1).max(250).required(),

        typeOfCard: Joi.string().min(5).max(20).required(),
        cardPriority: Joi.string().min(1).max(3).required(),
        qrCode: Joi.string().min(5).max(25).required(),

        department: Joi.string().min(5).max(25).required(),
        status: Joi.string().min(3).max(20).required(),
        currentProcess: Joi.number().min(0).max(15).required()

    };
    return Joi.validate(duler, schema);
}

module.exports.Duler = Duler;
module.exports.validateDuler = validateDuler;