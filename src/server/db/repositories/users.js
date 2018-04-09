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
  
  module.exports = {
    getUsers
  };
  