# chat_api
chat api backened using nodejs (common JS)

# installation
1. npm install
2. start your MySQL on your local machine, for linux user you can start it using mysql -u your_username -p, windows user can use XAMPP
4. configure the connection.js file inside db folder to follow your configuration
5. you can create the db (you can follow this project db which is db_message using CREATE DATABASE db_message on your MySQL Workbench)
6. after that you can copy and paste the db.sql files from the db folder, this should create all the necessary tables for this API, and insert the records to the respective table
7. enjoy it from npm run serve (mine will start on port 5000)

# features
1. User can send a message to another user. POST /message
2. User can list all messages in a conversation between them and another user GET /message/conversation/:convId/:userId
3. User can reply to a conversation they are involved with. POST /message
4. User can list all their conversations (if user A has been chatting with user C & D, the list for A will shows A-C & A-D) GET /conversation/user/:userId
4. a. each conversation is accompanied by its last message. GET /conversation/user/:userId have property last_message_time
   b. each conversation is accompanied by unread count. GET /conversation/user/:userId have property unread_count
5. List all users. GET /users
6. read conversation PUT /conversation/user/:userId 

# run the testing (using mocha and chai)
npm install mocha --save-dev 
npm install chai --save-dev 
npm install chai-http --save-dev 
npm run test

# response example
1. User can send a message to another user. POST /message 
## (New conversation)
```sh
{
  "message": "success insert message 2"
}
```

## (Existing conversation)
```sh
{
  "message": "success insert message 1"
}
```

2. User can list all messages in a conversation between them and another user GET /message/conversation/:convId/:userId
```sh
[
    {
        "id": 1,
        "conversation_id": 1,
        "sender_user_id": 1,
        "message": "Halo apa kabar?",
        "is_read": 1,
        "send_date": "2021-07-10T13:31:21.000Z"
    },
    {
        "id": 2,
        "conversation_id": 1,
        "sender_user_id": 2,
        "message": "Baik nih kamu gimana?",
        "is_read": 1,
        "send_date": "2021-07-10T13:31:21.000Z"
    },
    {
        "id": 3,
        "conversation_id": 1,
        "sender_user_id": 2,
        "message": "Oh ya btw jalan yuk",
        "is_read": 1,
        "send_date": "2021-07-10T13:31:21.000Z"
    },
    {
        "id": 4,
        "conversation_id": 1,
        "sender_user_id": 1,
        "message": "Aku baik, yuk gas",
        "is_read": 1,
        "send_date": "2021-07-10T13:31:21.000Z"
    },
    {
        "id": 5,
        "conversation_id": 1,
        "sender_user_id": 1,
        "message": "gasssss",
        "is_read": 1,
        "send_date": "2021-07-10T14:27:35.000Z"
    },
    {
        "id": 6,
        "conversation_id": 1,
        "sender_user_id": 1,
        "message": "gasssss",
        "is_read": 1,
        "send_date": "2021-07-10T14:28:03.000Z"
    },
    {
        "id": 7,
        "conversation_id": 1,
        "sender_user_id": 1,
        "message": "gasssss",
        "is_read": 1,
        "send_date": "2021-07-10T14:28:09.000Z"
    },
    {
        "id": 8,
        "conversation_id": 1,
        "sender_user_id": 1,
        "message": "gasssss",
        "is_read": 1,
        "send_date": "2021-07-10T14:34:13.000Z"
    },
    {
        "id": 9,
        "conversation_id": 1,
        "sender_user_id": 1,
        "message": "gasssss",
        "is_read": 1,
        "send_date": "2021-07-10T14:34:13.000Z"
    },
    {
        "id": 10,
        "conversation_id": 1,
        "sender_user_id": 1,
        "message": "gasssss",
        "is_read": 1,
        "send_date": "2021-07-10T14:34:17.000Z"
    },
    {
        "id": 11,
        "conversation_id": 1,
        "sender_user_id": 1,
        "message": "gasssss",
        "is_read": 1,
        "send_date": "2021-07-10T14:34:17.000Z"
    },
    {
        "id": 12,
        "conversation_id": 1,
        "sender_user_id": 1,
        "message": "gasssss",
        "is_read": 1,
        "send_date": "2021-07-10T14:34:17.000Z"
    },
    {
        "id": 13,
        "conversation_id": 1,
        "sender_user_id": 1,
        "message": "gasssss",
        "is_read": 1,
        "send_date": "2021-07-10T14:38:42.000Z"
    },
    {
        "id": 14,
        "conversation_id": 1,
        "sender_user_id": 1,
        "message": "gasssss",
        "is_read": 1,
        "send_date": "2021-07-10T14:39:07.000Z"
    },
    {
        "id": 15,
        "conversation_id": 1,
        "sender_user_id": 1,
        "message": "gasssss",
        "is_read": 1,
        "send_date": "2021-07-10T14:39:21.000Z"
    },
    {
        "id": 16,
        "conversation_id": 1,
        "sender_user_id": 2,
        "message": "boleh nih mau kemana ?",
        "is_read": 1,
        "send_date": "2021-07-10T14:42:38.000Z"
    },
    {
        "id": 17,
        "conversation_id": 1,
        "sender_user_id": 1,
        "message": "bekasi yuk",
        "is_read": 1,
        "send_date": "2021-07-10T14:43:22.000Z"
    },
    {
        "id": 18,
        "conversation_id": 1,
        "sender_user_id": 2,
        "message": "aku siap siap dulu ya",
        "is_read": 1,
        "send_date": "2021-07-10T14:43:50.000Z"
    },
    {
        "id": 19,
        "conversation_id": 1,
        "sender_user_id": 2,
        "message": "kamu jemput aku yahh",
        "is_read": 1,
        "send_date": "2021-07-10T14:44:55.000Z"
    },
    {
        "id": 20,
        "conversation_id": 1,
        "sender_user_id": 1,
        "message": "ok, aku otw 15 menit lagi",
        "is_read": 1,
        "send_date": "2021-07-10T14:45:24.000Z"
    },
    {
        "id": 21,
        "conversation_id": 1,
        "sender_user_id": 2,
        "message": "ok, see you",
        "is_read": 1,
        "send_date": "2021-07-10T14:45:37.000Z"
    },
    {
        "id": 31,
        "conversation_id": 1,
        "sender_user_id": 2,
        "message": "ok, see you",
        "is_read": 1,
        "send_date": "2021-07-10T15:09:13.000Z"
    },
    {
        "id": 32,
        "conversation_id": 1,
        "sender_user_id": 2,
        "message": "ok, see you",
        "is_read": 1,
        "send_date": "2021-07-10T15:12:00.000Z"
    },
    {
        "id": 33,
        "conversation_id": 1,
        "sender_user_id": 2,
        "message": "ok, see you",
        "is_read": 1,
        "send_date": "2021-07-10T15:17:09.000Z"
    },
    {
        "id": 34,
        "conversation_id": 1,
        "sender_user_id": 2,
        "message": "ok, see you",
        "is_read": 1,
        "send_date": "2021-07-10T15:17:19.000Z"
    },
    {
        "id": 35,
        "conversation_id": 1,
        "sender_user_id": 2,
        "message": "ok, see you",
        "is_read": 1,
        "send_date": "2021-07-10T15:18:03.000Z"
    },
    {
        "id": 36,
        "conversation_id": 1,
        "sender_user_id": 2,
        "message": "ok, see you",
        "is_read": 1,
        "send_date": "2021-07-10T15:22:33.000Z"
    },
    {
        "id": 39,
        "conversation_id": 1,
        "sender_user_id": 2,
        "message": "ok, see you",
        "is_read": 1,
        "send_date": "2021-07-10T17:28:25.000Z"
    },
    {
        "id": 40,
        "conversation_id": 1,
        "sender_user_id": 1,
        "message": "hai, kamu udah di mana?",
        "is_read": 1,
        "send_date": "2021-07-11T16:39:43.000Z"
    }
]
```

3. User can list all their conversations (if user A has been chatting with user C & D, the list for A will shows A-C & A-D) GET /conversation/user/:userId
```sh
[
    {
        "id": 1,
        "user_1": 1,
        "user_2": 2,
        "phone_1": "081888111222",
        "phone_2": "087755553333",
        "last_message_time": "2021-07-11T16:39:43.000Z",
        "unread_count": 0
    }
]
```

4. List all users GET /users
```sh
[
    {
        "id": 4,
        "phone_number": "081111111111"
    },
    {
        "id": 3,
        "phone_number": "0811112312312"
    },
    {
        "id": 5,
        "phone_number": "081133322222"
    },
    {
        "id": 6,
        "phone_number": "081231312123"
    },
    {
        "id": 1,
        "phone_number": "081888111222"
    },
    {
        "id": 2,
        "phone_number": "087755553333"
    }
]
```

5. read conversation PUT /conversation/user/:userId , with the request body {
    "conversationId" : 2
}

```sh
{
  "message": "successful update conversation to read"
}
```

