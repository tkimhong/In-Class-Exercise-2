const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const { getRecords, getSummary } = require('../controllers/api');
const { requireJWT } = require('../middleware/jwt.auth');

router.post('/login', auth.apiLogin);
router.get('/records', requireJWT, getRecords);
router.get('/summary', requireJWT, getSummary);

module.exports = router;
