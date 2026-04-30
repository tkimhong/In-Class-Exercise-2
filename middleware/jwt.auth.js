const { jwtDecrypt } = require('jose');
const crypto = require('node:crypto');
const { JWT_SECRET } = require('../config/app.config');

const secret = crypto.createHash('sha256').update(JWT_SECRET).digest();

async function requireJWT(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.sendStatus(401);
  try {
    const { payload } = await jwtDecrypt(header, secret);
    req.user = payload;
    next();
  } catch {
    res.sendStatus(403);
  }
}

module.exports = { requireJWT, secret };
