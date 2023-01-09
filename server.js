// check for prod/dev environment
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

//define express
const express = require('express');
const app = express();
const http = require('http');

// define cors - middleware
const cors = require('cors');
app.use(cors());

// define body-parse - middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// define socket.io
const { Server } = require('socket.io')

// import mongoose schema
const { Mero } = require('./schema/meros');
const { Duler } = require('./schema/dulers');
const { Employee } = require('./schema/employees');
const { Laser } = require('./schema/lasers');

//define mongoose
const mongoose = require('mongoose');

// connect with the database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
    .then(() => console.log('Connected to merosdb in MongoDB...'))
    .catch(err => console.error('Could not connect to merosdb in MongoDB...', err))

/////////////////// SOCKET.IO ///////////////////

// connect with socket
const io = require('socket.io')(5002, {
    cors: {
        origin: ['http://localhost:9000'],
        methods: ['GET', 'POST'],
    },
})

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on('room', (data) => {
        socket.join(data)
    })

    socket.on('send_update', (data) => {
        socket.to(data.room).emit('received_update', data);
    });
});


/////////////////// MEROS ///////////////////

// ==================== GET all ====================
app.get('/api/getparts', async (req, res) => {
    // console.log(req.query) Important for limit parameters
    // list all orders from the database, from lowest to highest
    // const meros = await Mero.find().sort('partNumber');
    const meros = await Mero.find().sort('partNumber');
    // close fetch
    res.send(meros);
});

// ==================== GET one part (validation) ====================
app.get('/api/getpart/:partNumber', async (req, res) => {
    // display one specific order from the database
    const mero = await Mero.find({ partNumber: req.params.partNumber });
    if (!mero) return res.status(404).send('Part number was not found.');
    // close fetch
    res.send(mero);
});

// ==================== POST ====================
app.post('/api/addpart', async (req, res) => {
    // new object to be added to database
    const addPart = new Mero({
        partNumber: req.body.partNumber,
        description: req.body.description,
        processes: req.body.processes
    })
    // add object to database
    addPart.save((err, doc) => {
        if (err) throw err;
        res.send(doc)
    })
});

// ==================== UPDATE ====================
app.post('/api/updatepart/:id', async (req, res) => {
    // find part number using the ID
    const mero = await Mero.findByIdAndUpdate(req.params.id,
        // update all processes in the found part
        { $set: { processes: req.body.processes } },
        // return the new (updated) processes
        { new: true });
    // if part was not found, return error message
    if (!mero) return res.status(404).send('Part number was not found.');
    // close fetch
    res.send(mero);
});

// ==================== REMOVE ====================
app.get('/api/removepart/:id', async (req, res) => {
    // find part number using the ID and remove it from database
    const mero = await Mero.findOneAndRemove({ _id: req.params.id });
    // if part was not found, return error message
    if (!mero) return res.status(404).send('Part number was not found.');
    // close fetch
    res.send(mero);
});


/////////////////// SULLEY ///////////////////

// ==================== GET one order (validation) ====================
app.get('/api2/getorder/:partNumber', async (req, res) => {
    // display one specific order from the database
    const mero = await Mero.find({ partNumber: req.params.partNumber });
    if (!mero) return res.status(404).send('Part number was not found.');
    // close fetch
    res.send(mero);
});

// ==================== GET all ====================
app.get('/api2/getorders/:department', async (req, res) => {
    // console.log(req.query) //Important for limit parameters
    // list all orders from the database, from lowest to highest
    const dulers = await Duler.find({ department: req.params.department })
    // close fetch
    res.send(dulers);
});

// ==================== POST one order ====================
app.post('/api2/addorder', async (req, res) => {
    // new object to be added to database
    const addOrder = new Duler(req.body)
    // add object to database
    addOrder.save((err, doc) => {
        if (err) throw err;
        res.send(doc)
    })
})

// ==================== UPDATE ====================
app.post('/api2/updateorder/:id', async (req, res) => {
    // find part number using the ID
    const duler = await Duler.findByIdAndUpdate(req.params.id,
        // update all processes in the found part
        { $set: req.body },
        // return the new (updated) processes
        { new: true });
    // if part was not found, return error message
    if (!duler) return res.status(404).send('Part number was not found.');
    // close fetch
    res.send(duler);
});

/////////////////// EMPLOYEES ///////////////////

// ==================== GET one employee (validation) ====================
app.get('/api3/checkid/:id', async (req, res) => {
    // display one specific order from the database
    const employee = await Employee.find({ employeeId: req.params.id });
    if (!employee) return res.status(404).send('Employee was not found.');
    // close fetch
    res.send(employee);
});


/////////////////// LASER ///////////////////

// ==================== GET all ====================
app.get('/api4/gettasks', async (req, res) => {
    // console.log(req.query) //Important for limit parameters
    // list all orders from the database, from lowest to highest
    const lasers = await Laser.find()
    // close fetch
    res.send(lasers);
});

// ==================== POST one order ====================
app.post('/api4/addtask', async (req, res) => {
    // new object to be added to database
    const addTask = new Laser(req.body)
    // add object to database
    addTask.save((err, doc) => {
        if (err) throw err;
        res.send(doc)
    })
})

// ==================== UPDATE ====================
app.post('/api4/updatejob/:id', async (req, res) => {
    // find part number using the ID
    const laser = await Laser.findByIdAndUpdate(req.params.id,
        // update all processes in the found part
        { $set: req.body },
        // return the new (updated) processes
        { new: true });
    // if part was not found, return error message
    if (!laser) return res.status(404).send('Part number was not found.');
    // close fetch
    res.send(laser);
});


// ==================== REMOVE ====================
app.get('/api4/removejob/:id', async (req, res) => {
    // find part number using the ID and remove it from database
    const laser = await Laser.findOneAndRemove({ _id: req.params.id });
    // if part was not found, return error message
    if (!laser) return res.status(404).send('Part number was not found.');
    // close fetch
    res.send(laser);
});

//////////////////////// PERSONA /////////////////////////

app.get('/api5/employees', async (req, res) => {
    try {
        const allEmployees = await Employee.find()
        res.send(allEmployees)
    } catch (error) {
        res.send(error.message)
    }
})

// ==================== Get All ====================
app.get('/api5/employees', async (req, res) => {
    try {
        const allEmployees = await Employee.find()
        res.send(allEmployees)
    } catch (error) {
        res.send(error.message)
    }
})

// ==================== Get By ID ====================
app.get('/api5/employee/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id)
        if (employee === null) {
            throw new BadRequest('ID entered is invalid')
        }
        res.send(employee)
    } catch (error) {
        res.send(error.message)
    }
})

// ==================== Employees Post ====================
app.post('/api5/employees', async (req, res) => {
    try {
        const newEmployee = await Employee.create(req.body)
        res.send(newEmployee)
    } catch (error) {
        res.send(error.message)
    }
})

// ==================== Employees Update ====================
app.put('/api5/employee/:employeeId', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.employeeId)
        if (employee === null) {
            throw new BadRequest('ID entered is invalid')
        }

        employee.firstName = req.body.firstName || employee.firstName
        employee.middleName = req.body.middleName || employee.middleName
        employee.lastName = req.body.lastName || employee.lastName
        employee.employeeId = req.body.employeeId || employee.employeeId
        employee.email = req.body.email || employee.email
        employee.phoneNumber = req.body.phoneNumber || employee.phoneNumber
        employee.position = req.body.position || employee.position
        employee.teamLead = req.body.teamLead || employee.teamLead
        employee.groupLead = req.body.groupLead || employee.groupLead
        employee.companyName = req.body.companyName || employee.companyName
        employee.team = req.body.team || employee.team
        employee.save()
        res.send(employee)
    } catch (error) {
        res.send(error.message)
    }
})

// ==================== Employees Delete ====================

app.delete('/api5/employee/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id)
        if (employee === null) {
            throw new BadRequest('ID entered is invalid')
        }
        await employee.remove()
        res.send(employee._id)
    } catch (error) {
        res.send(error)
    }
})

// define PORT for database
const port = process.env.PORT || 5001;
app.listen(port);