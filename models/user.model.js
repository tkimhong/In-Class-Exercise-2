const bcrypt = require("bcrypt");

const users = [];
let nextId = 1;

function findByUsername(username) {
  return users.find((u) => u.username === username);
}

async function create(username, password) {
  const hash = await bcrypt.hash(password, 10);
  const user = { id: nextId++, username, passwordHash: hash };
  users.push(user);
  return user;
}

async function verify(username, password) {
  const user = findByUsername(username);
  if (!user) return null;
  const match = await bcrypt.compare(password, user.passwordHash);
  return match ? user : null;
}

module.exports = { findByUsername, create, verify };
