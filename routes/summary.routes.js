const express = require('express');
const router = express.Router();
const { getSummary } = require('../controllers/summaryController');
const { requireLogin } = require('../middleware/session.auth');

router.get('/summary', requireLogin, getSummary);

module.exports = router;
