const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');
const { requireLogin } = require('../middleware/session.auth');
const { csrfSynchronisedProtection } = require('../config/csrf.config');

router.get('/dashboard', requireLogin, recordController.getDashboard);

router.get('/records/add', requireLogin, recordController.renderAddForm);
router.post('/records/add', requireLogin, csrfSynchronisedProtection, recordController.createRecord);

router.get('/records/edit/:id', requireLogin, recordController.renderEditForm);
router.post('/records/edit/:id', requireLogin, csrfSynchronisedProtection, recordController.updateRecord);

router.post('/records/delete/:id', requireLogin, csrfSynchronisedProtection, recordController.deleteRecord);

module.exports = router;
