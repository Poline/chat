const bcrypt = require('bcrypt');
const db = require('../../db/connection');

const users = require('./users');

const create = async chat => {
  try {
    const first_user_id = await users.getUserId(chat.first_user_email);
    const second_user_id = await users.getUserId(chat.second_user_email);
    
    const newChat = await db.one(
        'INSERT INTO chats(chat_name, first_user_id, second_user_id) VALUES($1, $2, $3) RETURNING chat_name, first_user_id',
        [chat.name, first_user_id.id, second_user_id.id]
    );
    
    const chats = await getChats(first_user_id.id);

    return chats;
  } catch (e) {
    throw new Error(e.message);
  }
};

const getChats = async id => {
  try {
    const chats = await db.any(
      'SELECT * FROM chats WHERE first_user_id=$1', [
        id,
      ]
    );
    let chatsWithUsersInfo = [];

    await Promise.map(chats, async (chat) => {
        const second_user = await users.getUser(chat.second_user_id);

        chat.second_user_email = first_user.email;
        chat.second_user_name = first_user.name;
        chat.second_login_at = first_user.last_login_at

        chatsWithUsersInfo.push(chat);
      }
    )
    
    return chatsWithUsersInfo;
  } catch (e) {
    throw new Error(e.message);
  }
}

const getChatId = async chat => {
  try {
    const chatId = await db.any(
      'SELECT id FROM chats WHERE first_user_id=$1, second_user_id=$2, chat_name=$1', [
        chat.first_user_id, chat.second_user_id, chat.chat_name,
      ]
    );

    return chatId;
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = {
    create,
    getChats,
    getChatId
};
