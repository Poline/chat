psql -U postgres < users.sql
printf "users created\n"
psql -U postgres < chats.sql
printf "chats created\n"