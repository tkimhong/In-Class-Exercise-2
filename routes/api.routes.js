const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const { requireJWT } = require('../middleware/jwt.auth');

router.post('/login', auth.apiLogin);

// Placeholder — Part 2 will add GET /api/records here
router.get('/records', requireJWT, (req, res) => {
  res.json({ message: 'records endpoint — wired up by Part 2', user: req.user });
});

module.exports = router;
