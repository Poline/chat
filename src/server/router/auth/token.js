const jwt = require('jsonwebtoken');
const bluebird = require('bluebird');

bluebird.promisifyAll(jwt);

const create = async data => {
  return await jwt.sign(
    {
      data,
    },
    'secret',
    { expiresIn: '1h' }
  );
};

const validate = async(ctx, next) => {
  try {
    const decoded = await jwt.verify(ctx.cookies.get('token'), 'secret');
    if(decoded.exp > Date.now()){
      throw new Error('token expired');
    }
    next(ctx);
  } catch (e) {
    ctx.status = 403;
    ctx.body = e.message;
  }
}

module.exports = {
  create,
  validate,
};
