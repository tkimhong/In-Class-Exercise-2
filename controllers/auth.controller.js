const { EncryptJWT } = require('jose');
const { secret } = require('../middleware/jwt.auth');
const User = require('../models/user.model');
const { generateToken } = require('../config/csrf.config');

const showLogin = (req, res) => {
  res.render('auth/login', { error: req.session.flash, csrfToken: generateToken(req) });
};

const processLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.verify(username, password);
  if (!user) {
    req.session.flash = 'Invalid username or password';
    return res.redirect('/login');
  }
  req.session.flash = null;
  req.session.user = { id: user.id, username: user.username };
  req.session.save(() => res.redirect('/dashboard'));
};

const showRegister = (req, res) => {
  res.render('auth/register', { error: req.session.flash, csrfToken: generateToken(req) });
};

const processRegister = async (req, res) => {
  const { username, password } = req.body;
  if (User.findByUsername(username)) {
    req.session.flash = 'Username already taken';
    return res.redirect('/register');
  }
  const user = await User.create(username, password);
  req.session.flash = null;
  req.session.user = { id: user.id, username: user.username };
  req.session.save(() => res.redirect('/dashboard'));
};

const logout = (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
};

const apiLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.verify(username, password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const token = await new EncryptJWT({ id: user.id, username: user.username })
    .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
    .setExpirationTime('1h')
    .encrypt(secret);

  res.json({ token });
};

module.exports = { showLogin, processLogin, showRegister, processRegister, logout, apiLogin };
