const express = require('express')
const router = express.Router({ mergeParams: true })

router.get('/users', require('./controller/users').getUsers)

router.post('/message', require('./controller/messages').sendMessage)
router.get('/message/conversation/:convId', require('./controller/messages').getMessagesByConvId)

router.get('/conversation/user/:userId', require('./controller/messages').getConversationsByUserId)
router.get('/conversation/user-unread/:userId', require('./controller/messages').getConversationsWithUnreadCount)

module.exports = router