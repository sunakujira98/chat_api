const express = require('express')
const router = express.Router({ mergeParams: true })

router.get('/user', require('./controller/users').getUsers)

router.post('/message', require('./controller/messages').sendMessage)
router.get('/message/conversation/:convId/:userId', require('./controller/messages').getMessagesByConvId)

router.get('/conversation/user/:userId', require('./controller/messages').getConversationsByUserId)
router.put('/conversation/user/:userId', require('./controller/messages').readConversation)

module.exports = router