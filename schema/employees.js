// define modules
const Joi = require('joi');
const mongoose = require('mongoose');

// define schema
const Employee = mongoose.model('Employee', mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25
    },
    middleName: {
        type: String,
        maxlength: 20
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25
    },
    employeeId: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 4
    },
    email: {
        type: String,
        minlength: 10,
        maxlength: 50,
    },
    phoneNumber: {
        type: String,
        maxlength: 20
    },
    team: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 25
    },
    position: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    teamLead: {
        type: String,
        maxlength: 25
    },
    groupLead: {
        type: String,
        maxlength: 25
    },
    companyName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 25
    },
    status: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    }

}));

// function to validate employees
function validateEmployee(employee) {
    const schema = {
        firstName: Joi.string().min(3).max(25).required(),
        middleName: Joi.string().max(20),
        lastName: Joi.string().min(3).max(25).required(),
        employeeId: Joi.string().min(3).max(4).required(),
        email: Joi.string().min(10).max(50),
        phoneNumber: Joi.string().max(20),
        team: Joi.string().min(1).max(25).required(),
        position: Joi.string().min(2).max(20).required(),
        teamLead: Joi.string().max(25),
        groupLead: Joi.string().max(25),
        companyName: Joi.string().min(2).max(25).required(),
        status: Joi.string().min(2).max(20).required()
    };
    return Joi.validate(employee, schema);
}

module.exports.Employee = Employee;
module.exports.validateEmployee = validateEmployee;