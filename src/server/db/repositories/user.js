const bcrypt = require('bcrypt');
const db = require('../../db/connection');

const create = async user => {
  try {
    const passwordHash = await bcrypt.hash(user.password, 10);
    const data = await db.one(
      'INSERT INTO users(email, name, password_hash) VALUES($1, $2, $3) RETURNING email, last_login_at',
      [user.email, user.name, passwordHash]
    );
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

const login = async user => {
  try {
    const data = await db.one('SELECT * FROM users WHERE email=$1', [
      user.email,
    ]);

    const compareResult = await bcrypt.compare(
      user.password,
      data.password_hash
    );
    
    if (compareResult === true) {
      return Object.assign(
        data,
        await db.one(
          'UPDATE users SET last_login_at=DEFAULT WHERE email=$1 RETURNING last_login_at',
          [user.email]
        )
      );
    } else {
      throw new Error('Wrong password');
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

const authorize = async user => {
  try {
    return await db.one(
      'SELECT name, email, last_login_at FROM users WHERE email=$1',
      [user.email]
    );
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  create,
  authorize,
  login,
};
