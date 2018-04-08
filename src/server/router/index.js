const router = require('koa-router')();
const auth = require('./auth');

router.use('/api/auth', auth.routes())

module.exports = router;
