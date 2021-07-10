const express = require('express')
const router = express.Router({ mergeParams: true })

router.get('/users', require('./controller/users').getUsers)

router.post('/message', require('./controller/messages').sendMessage)
router.get('/message/:convId', require('./controller/messages').getMessagesByConvId)

module.exports = router