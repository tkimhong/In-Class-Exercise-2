const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const expressSession = require('express-session');
const FileStore = require('session-file-store')(expressSession);
const { SESSION_SECRET, PORT } = require('./config/app.config');
const { generateToken } = require('./config/csrf.config');
const webRoutes = require('./routes/web.routes');
const apiRoutes = require('./routes/api.routes');

const app = express();

app.engine('handlebars', engine({
  defaultLayout: 'main',
  extname: '.handlebars',
  layoutsDir: path.join(__dirname, 'views/layouts'),
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(expressSession({
  secret: SESSION_SECRET,
  store: new FileStore({ path: './sessions', retries: 0, ttl: 3600 }),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
}));

app.use((req, res, next) => {
  res.locals.csrfToken = generateToken(req);
  res.locals.user = req.session.user || null;
  next();
});

app.use('/', webRoutes);
app.use('/api', apiRoutes);

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
