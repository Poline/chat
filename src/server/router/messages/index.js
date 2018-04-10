const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');

const chats = require('../../db/repositories/chats');
const messages = require('../../db/repositories/messages');
const user = require('../../db/repositories/users');

router.post('/get', bodyParser(), async ctx => {
  try {
    const data = ctx.request.body;
    const first_user_id = await user.getUserId(data.first_user_email);
    const second_user_id = await user.getUserId(data.second_user_email);
    const chatId = await chats.getChatId(first_user_id.id, second_user_id.id, data.chat_name);
    const messagesList = await messages.getMessages(chatId.id);
    
    ctx.status = 200;
    ctx.body = messagesList;
  } catch (e) {
    ctx.status = 404;
    ctx.body = e.message;
  }
});

router.post('/sendmessage', bodyParser(), async ctx => {
  try {
    const data = ctx.request.body;
    const first_user_id = await user.getUserId(data.first_user_email);
    const second_user_id = await user.getUserId(data.second_user_email);
    const chatId = await chats.getChatId(first_user_id.id, second_user_id.id, data.chat_name);

    const messagesList = await messages.addMessage(data.message, chatId.id, first_user_id.id);
    
    ctx.status = 200;
    ctx.body = messagesList;
  } catch (e) {
    ctx.status = 404;
    ctx.body = e.message;
  }
});

module.exports = router;
