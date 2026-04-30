// routes/recordRoutes.js
const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');

// Note: Person 1 should apply the authentication middleware (e.g., requireAuth) 
// and CSRF middleware to these routes in app.js, or you can import them here.

// Dashboard - Read all
router.get('/dashboard', recordController.getDashboard);

// Create
router.get('/records/add', recordController.renderAddForm);
router.post('/records/add', recordController.createRecord);

// Update
router.get('/records/edit/:id', recordController.renderEditForm);
router.post('/records/edit/:id', recordController.updateRecord);

// Delete (Using POST for standard web forms to support CSRF easily)
router.post('/records/delete/:id', recordController.deleteRecord);

module.exports = router;