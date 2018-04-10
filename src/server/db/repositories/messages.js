const bcrypt = require('bcrypt');
const db = require('../../db/connection');

const users = require('./users');

const getMessages = async id => {
  try {
    const messages = await db.any(
      'SELECT * FROM messages WHERE chat_id=$1 ORDER BY created_at ASC', [
        id,
      ]
    );

    let messagesList = [];

    await Promise.map(messages, async (message) => {
      const from_user = await users.getUser(message.from_user);
      message.from_user_email = from_user.email;
      messagesList.push(message);
    })

    return messagesList;
  } catch (e) {
    throw new Error(e.message);
  }
}

const addMessage = async (message, chatId, userId) => {
  try {
    const data = await db.one(
      'INSERT INTO messages(chat_id, from_user, message_text) VALUES($1, $2, $3) RETURNING id',
      [chatId, userId, message]
    );
    const messages = getMessages(chatId);

    return messages;
  } catch (e) {
    throw new Error(e.message);
  }
}


module.exports = {
  getMessages,  
  addMessage
};
