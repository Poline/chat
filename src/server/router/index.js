const router = require('koa-router')();
const auth = require('./auth');
const users = require('./users');

router.use('/api/auth', auth.routes())
router.use('/api/users', users.routes())

module.exports = router;
