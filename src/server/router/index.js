const router = require('koa-router')();
const auth = require('./auth');
const users = require('./users');
const chats = require('./chats');

router.use('/api/auth', auth.routes())
router.use('/api/users', users.routes())
router.use('/api/chats', chats.routes())

module.exports = router;
