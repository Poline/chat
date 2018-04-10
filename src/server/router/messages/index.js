const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');

const chats = require('../../db/repositories/chats');
const messages = require('../../db/repositories/messages');
const user = require('../../db/repositories/user');

router.post('/get', bodyParser(), async ctx => {
  try {
    const chatId = await chats.getChatId(ctx.request.body)
    const messagesList = await messages.getMessages(chatId.id);
    
    ctx.status = 200;
    ctx.body = chatsList;
  } catch (e) {
    ctx.status = 404;
    ctx.body = e.message;
  }
});

router.post('/sendmessage', bodyParser(), async ctx => {
  try {
    const data = ctx.request.body;
    const chatId = await chats.getChatId(data.chat_name)
    const userId = await user.getUserId(data.user_email)
    const messagesList = await messages.addMessage(data.message, chatId, userId);
    
    ctx.status = 200;
    ctx.body = chatsList;
  } catch (e) {
    ctx.status = 404;
    ctx.body = e.message;
  }
});

module.exports = router;
