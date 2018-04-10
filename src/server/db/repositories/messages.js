const bcrypt = require('bcrypt');
const db = require('../../db/connection');

const users = require('./users');

const getMessages = async id => {
  try {
    const messages = await db.any(
      'SELECT * FROM messages WHERE chat_id=$1', [
        id,
      ]
    );
    
    return messages;
  } catch (e) {
    throw new Error(e.message);
  }
}

const addMessage = async (message, chatId, userId) => {
  try {
    const data = await db.one(
      'INSERT INTO messages(chat_id, from_user, message_text) VALUES($1, $2, $3) RETURNING id',
      [chatId, chatId, message]
    );

    const messages = getMessages(chatId);

    return messages;
  } catch (e) {
    throw new Error(e.message);
  }
}


module.exports = {
    getMessages
};
