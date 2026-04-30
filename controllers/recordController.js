const FuelRecord = require('../models/fuelRecord');

const recordController = {
    getDashboard: (req, res) => {
        const userId = req.session.user.id;
        const userRecords = FuelRecord.findAllByUser(userId);
        res.render('dashboard', { records: userRecords });
    },

    renderAddForm: (req, res) => {
        res.render('add-record');
    },

    createRecord: (req, res) => {
        const { date, vehicleType, liters, distance, totalCost } = req.body;
        FuelRecord.create({
            userId: req.session.user.id,
            date,
            vehicleType,
            liters: parseFloat(liters),
            distance: parseFloat(distance),
            totalCost: parseFloat(totalCost)
        });
        res.redirect('/dashboard');
    },

    renderEditForm: (req, res) => {
        const record = FuelRecord.findById(req.params.id);
        if (!record || record.userId !== req.session.user.id) {
            return res.status(403).send('Unauthorized or Record not found');
        }
        res.render('edit-record', { record });
    },

    updateRecord: (req, res) => {
        const record = FuelRecord.findById(req.params.id);
        if (!record || record.userId !== req.session.user.id) {
            return res.status(403).send('Unauthorized or Record not found');
        }
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

    deleteRecord: (req, res) => {
        const record = FuelRecord.findById(req.params.id);
        if (record && record.userId === req.session.user.id) {
            FuelRecord.delete(req.params.id);
        }
        res.redirect('/dashboard');
    }
};

module.exports = recordController;
