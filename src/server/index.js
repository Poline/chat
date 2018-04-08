const Koa = require('koa');
const logger = require('koa-morgan');
const router = require('./router');
const db = require('./db/connection');
const config = require('./config');
global.Promise = require('bluebird');

const server = new Koa();

server.use(router.routes());
server.use(logger('tiny'));

db
  .connect()
  .then(cn => {
    console.log('Database connected on port', config.db.port);
    cn.done(); // success, release connection;

    server.listen(config.app.port, () => {
      console.log('Server listening port %d', config.app.port);
    });
  })
  .catch(error => {
    console.log('ERROR:', error.message);
  });
