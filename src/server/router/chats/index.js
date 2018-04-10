const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');

const chats = require('../../db/repositories/chats');
const users = require('../../db/repositories/users');

router.post('/create', bodyParser(), async ctx => {
  try {
    const chatsList = await chats.create(ctx.request.body);
    
    ctx.status = 200;
    ctx.body = chatsList;
  } catch (e) {
    ctx.status = 404;
    ctx.body = e.message;
  }
});

router.post('/get', bodyParser(), async ctx => {
  try {
    const userId = await users.getUserId(ctx.request.body.user_email)
    const chatsList = await chats.getChats(userId.id);
    
    ctx.status = 200;
    ctx.body = chatsList;
  } catch (e) {
    ctx.status = 404;
    ctx.body = e.message;
  }
});

module.exports = router;
