DROP DATABASE IF EXISTS chat;
CREATE DATABASE chat;

\c chat

CREATE TABLE chats (
  id SERIAL PRIMARY KEY,
  chat_name TEXT,
  first_user_id INT REFERENCES users(id),
  second_user_id INT REFERENCES users(id),
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  chat_id INT REFERENCES chats(id) ON DELETE CASCADE,
);
