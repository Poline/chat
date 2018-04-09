const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');

const user = require('../../db/repositories/users');

router.get('/userslist', bodyParser(), async ctx => {
  try {
    const users = await user.getUsers();
    ctx.status = 200;
    ctx.body = users;
  } catch (e) {
    ctx.status = 401;
    ctx.body = e.message;
  }
});

module.exports = router;
