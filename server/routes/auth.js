const express = require('express')
const router = express.Router()
const { signup, signin, register, check, cancel } = require('../handlers/auth')

router.post('/signup/', signup)
router.post('/signin/', signin)
router.post('/register/', register)
router.post('/check/', check)
router.post('/cancel/', cancel)

module.exports = router