// controllers/recordController.js
const FuelRecord = require('../models/FuelRecord');

const recordController = {
    // Display the dashboard with all records
    getDashboard: (req, res) => {
        // Assuming Person 1 set req.session.userId during login
        const userId = req.session.userId; 
        const userRecords = FuelRecord.findAllByUser(userId);
        
        res.render('dashboard', { 
            records: userRecords,
            csrfToken: req.csrfToken() // Provided by Person 1's middleware
        });
    },

    // Render the Add Record form
    renderAddForm: (req, res) => {
        res.render('add-record', { 
            csrfToken: req.csrfToken() 
        });
    },

    // Handle Add Record submission
    createRecord: (req, res) => {
        const { date, vehicleType, liters, distance, totalCost } = req.body;
        
        FuelRecord.create({
            userId: req.session.userId,
            date,
            vehicleType,
            liters,
            distance,
            totalCost
        });
        
        res.redirect('/dashboard');
    },

    // Render the Edit Record form
    renderEditForm: (req, res) => {
        const record = FuelRecord.findById(req.params.id);
        if (!record || record.userId !== req.session.userId) {
            return res.status(403).send('Unauthorized or Record not found');
        }

        res.render('edit-record', { 
            record, 
            csrfToken: req.csrfToken() 
        });
    },

    // Handle Edit Record submission
    updateRecord: (req, res) => {
        const { date, vehicleType, liters, distance, totalCost } = req.body;
        
        FuelRecord.update(req.params.id, {
            date,
            vehicleType,
            liters: parseFloat(liters),
            distance: parseFloat(distance),
            totalCost: parseFloat(totalCost)
        });
        
        res.redirect('/dashboard');
    },

    // Handle Delete Record
    deleteRecord: (req, res) => {
        // Verify ownership before deleting
        const record = FuelRecord.findById(req.params.id);
        if (record && record.userId === req.session.userId) {
            FuelRecord.delete(req.params.id);
        }
        res.redirect('/dashboard');
    }
};

module.exports = recordController;