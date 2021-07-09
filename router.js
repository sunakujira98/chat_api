const express = require('express')
const router = express.Router({ mergeParams: true })

router.get('/users', require('./controller/users').getUsers)

module.exports = router