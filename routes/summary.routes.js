
const express = require('express');
const router  = express.Router();
const { getSummary } = require('../controllers/summaryController');
 
// Inline session guard — reuse whatever P1 exported, or define it here
function requireLogin(req, res, next) {
  if (req.session && req.session.userId) return next();
  res.redirect('/login');
}
 
router.get('/', requireLogin, getSummary);
 
module.exports = router;