const bcrypt = require('bcrypt');
const db = require('../../db/connection');

const getUsers = async user => {
  try {
    return await db.any(
      'SELECT name, email, last_login_at FROM users'
    );
  } catch (e) {
    throw new Error(e.message);
  }
};

const getUserId = async email => {
  try {
    return await db.one(
      'SELECT id FROM users WHERE email=$1', [
        email,
      ]
    );
  } catch (e) {
    throw new Error(e.message);
  }
};


const getUser = async id => {
  try {
    return await db.one(
      'SELECT * FROM users WHERE id=$1', [
        id,
      ]
    );
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  getUsers,
  getUserId,
  getUser
};
