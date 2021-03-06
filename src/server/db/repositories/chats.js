const bcrypt = require('bcrypt');
const db = require('../../db/connection');

const users = require('./users');

const create = async chat => {
  try {
    const creator_id = await users.getUserId(chat.creator);
    // const second_user_id = await users.getUserId(chat.second_user_email);
    
    const newChat = await db.one(
        'INSERT INTO chats(chat_name, creator_id) VALUES($1, $2) RETURNING id',
        [chat.name, creator_id.id]
    );

    await Promise.map(chat.users, async (user) => {
      const user_id = await users.getUserId(user);

      await db.one(
        'INSERT INTO chat_user(chat_id, user_id) VALUES($1, $2) RETURNING id',
        [newChat.id, user_id.id]
      );
    })

    const chats = await getChats(creator_id.id);

    return chats;
  } catch (e) {
    throw new Error(e.message);
  }
};

const getChats = async id => {
  try {
    const chats_user = await db.any(
      'SELECT * FROM chat_user WHERE user_id=$1', [
        id,
      ]
    );
    let chats = [];

    await Promise.map(chats_user, async (chat_user) => {
      // console.log(chat_user)
      const chat = await db.any(
        'SELECT * FROM chats WHERE id=$1 ORDER BY created_at ASC', [
          chat_user.chat_id,
        ]);
        // console.log(chat)

    //     const second_user = await users.getUser(chat.second_user_id);
    //     const first_user = await users.getUser(chat.first_user_id);

    //     chat.second_user_email = second_user.email;
    //     chat.second_user_name = second_user.name;
    //     chat.second_login_at = second_user.last_login_at;

    //     chat.first_user_email = first_user.email;
    //     chat.first_user_name = first_user.name;
    //     chat.first_login_at = first_user.last_login_at;

      chats.push(chat);
      }
    )
    console.log(chats)
    
    return chats;
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
