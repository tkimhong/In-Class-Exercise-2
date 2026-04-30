const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const { requireLogin } = require('../middleware/session.auth');
const { csrfSynchronisedProtection } = require('../config/csrf.config');

router.get('/', (req, res) => res.redirect('/dashboard'));
router.get('/dashboard', requireLogin, (req, res) =>
  res.render('dashboard', { user: req.session.user })
);

router.get('/login', auth.showLogin);
router.post('/login', csrfSynchronisedProtection, auth.processLogin);

router.get('/register', auth.showRegister);
router.post('/register', csrfSynchronisedProtection, auth.processRegister);

router.post('/logout', csrfSynchronisedProtection, auth.logout);

module.exports = router;
