// models/FuelRecord.js

// In-memory array to store records
let records = [];

const FuelRecord = {
    // Create
    create: (recordData) => {
        const newRecord = {
            id: Date.now().toString(), // Simple unique ID
            userId: recordData.userId, 
            date: recordData.date,
            vehicleType: recordData.vehicleType,
            liters: parseFloat(recordData.liters),
            distance: parseFloat(recordData.distance),
            totalCost: parseFloat(recordData.totalCost),
            createdAt: new Date()
        };
        records.push(newRecord);
        return newRecord;
    },

    // Read (All for a specific user)
    findAllByUser: (userId) => {
        return records.filter(record => record.userId === userId);
    },

    // Read (Single record by ID)
    findById: (id) => {
        return records.find(record => record.id === id);
    },

    // Update
    update: (id, updatedData) => {
        const index = records.findIndex(record => record.id === id);
        if (index !== -1) {
            records[index] = { ...records[index], ...updatedData };
            return records[index];
        }
        return null;
    },

    // Delete
    delete: (id) => {
        const initialLength = records.length;
        records = records.filter(record => record.id !== id);
        return records.length !== initialLength; // Returns true if deleted
    }
};

module.exports = FuelRecord;