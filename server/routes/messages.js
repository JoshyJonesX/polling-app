const express = require('express')
const router = express.Router({ mergeParams: true })

const { 
    createMessage,
    deleteMessage
 } = require('../handlers/messages')

router.route('/student/:student_id/messages')
   .post(createMessage)

router.route('/student/:student_id/messages/:message_id')
   .delete(deleteMessage)

module.exports = router