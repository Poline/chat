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
      'SELECT * FROM chats WHERE first_user_id=$1 or second_user_id=$1', [
        id,
      ]
    );
    let chatsWithUsersInfo = [];

    await Promise.map(chats, async (chat) => {
        const second_user = await users.getUser(chat.second_user_id);

        chat.second_user_email = second_user.email;
        chat.second_user_name = second_user.name;
        chat.second_login_at = second_user.last_login_at

        chatsWithUsersInfo.push(chat);
      }
    )
    
    return chatsWithUsersInfo;
  } catch (e) {
    throw new Error(e.message);
  }
}

const getChatId = async (first_user_id, second_user_id, chat_name) => {
  try {
    const chatId = await db.one(
      'SELECT * FROM chats WHERE chat_name=$1 and first_user_id=$2 and second_user_id=$3', [
        chat_name, first_user_id, second_user_id,
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
