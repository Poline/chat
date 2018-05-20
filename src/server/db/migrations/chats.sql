\c chat

CREATE TABLE chats (
  id SERIAL PRIMARY KEY,
  chat_name TEXT,
  creator_id INT REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE chat_user (
  id SERIAL PRIMARY KEY,
  chat_id INT REFERENCES chats(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id)
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  chat_id INT REFERENCES chats(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  from_user INT REFERENCES users(id),
  message_text TEXT,
  is_readed BOOLEAN
);
