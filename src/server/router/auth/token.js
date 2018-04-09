const jwt = require('jsonwebtoken');
const bluebird = require('bluebird');

bluebird.promisifyAll(jwt);

const create = async (data, expiresIn) => {
  return await jwt.sign(
    {
      data,
    },
    'secret',
    { expiresIn: expiresIn }
  );
};

const validate = async(ctx, next) => {
  try {
    const decoded = await jwt.verify(ctx.cookies.get('token'), 'secret');
    if (decoded.exp > Date.now()) {
      throw new Error('token expired');
    }
    next(ctx, decoded.user);
  } catch (e) {
    ctx.status = 401;
    ctx.body = e.message;
  }
}

const decode = async (token) => {
  try {
    return await jwt.verify(token, 'secret');
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  create,
  validate,
  decode,
};
