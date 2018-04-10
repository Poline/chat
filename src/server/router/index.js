const router = require('koa-router')();
const auth = require('./auth');
const users = require('./users');
const chats = require('./chats');
const messages = require('./messages');

router.use('/api/auth', auth.routes())
router.use('/api/users', users.routes())
router.use('/api/chats', chats.routes())
router.use('/api/messages', messages.routes())

module.exports = router;
