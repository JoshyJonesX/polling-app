const express = require('express')
const router = express.Router()
const { signup, signin, preSignup } = require('../handlers/auth')

router.post('/signup/:department_id', signup)
router.post('/signin/', signin)
router.post('/presignup/:unRegStudent_id', preSignup)

module.exports = router;