const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const token = require('./token');

const user = require('../../db/repositories/user');

router.post('/signup', bodyParser(), async ctx => {
  try {
    const userData = await user.create(ctx.request.body);
    ctx.cookies.set('token', await token.create(userData), {
      httpOnly: false,
      maxAge: 1000 * 60 * 60,
    });
    ctx.status = 201;
    ctx.body = userData;
  } catch (e) {
    ctx.status = 404;
    ctx.body = e;
  }
});

router.post('/signin', bodyParser(), async ctx => {
  try {
    const userData = await user.authorize(ctx.request.body);
    userData.password_hash = undefined;
    userData.created_at = undefined;
    userData.id = undefined;
    ctx.cookies.set('token', await token.create(userData), {
      httpOnly: false,
      maxAge: 1000 * 60 * 60,
    });
    ctx.body = userData;
  } catch (e) {
    ctx.status = 404;
    ctx.body = e.message;
  }
});

router.post('/check', bodyParser(), token.validate, async ctx => {
  ctx.body = 'WELCOME';
});

module.exports = router;
