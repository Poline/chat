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
    const userData = await user.login(ctx.request.body);
    userData.password_hash = undefined;
    userData.created_at = undefined;
    userData.id = undefined;
    ctx.cookies.set('token', await token.create(userData, '1h'), {
      httpOnly: false,
      maxAge: 1000 * 60 * 60,
    });
    ctx.status = 200;
    ctx.body = userData;
  } catch (e) {
    ctx.status = 404;
    ctx.body = e.message;
  }
});


router.get('/authorize', bodyParser(), async ctx => {
  try {
    const decodedToken = await token.decode(ctx.cookies.get('token'));
    const userData = await user.authorize(decodedToken.data);
    ctx.cookies.set('token', await token.create(userData, '1h'), {
      httpOnly: false,
      maxAge: 1000 * 60 * 60,
    });
    ctx.status = 200;
    ctx.body = userData;
  } catch (e) {
    ctx.status = 401;
    ctx.body = e.message;
  }
});

router.get('/logout', bodyParser(), async ctx => {
  ctx.cookies.set('token', null);
  ctx.status = 200;
});

module.exports = router;
