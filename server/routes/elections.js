const express  = require('express')
const router = express.Router({ mergeParams: true })

const {
    getElections,
    createElection,
    updateElection,
    deleteElection
} = require('../handlers/election')

const {
    createContestant,
    deleteContestant,
    updateContestant
} = require('../handlers/contestant')

const { 
    createMessage,
    deleteMessage
 } = require('../handlers/messages')

router.route('/')
.get(getElections)    
.post(createElection)
    

router.route('/:id')
    .post(createElection)
    .put(updateElection)
    .delete(deleteElection)

router.route('/:election_id/contestant/')
    .post(createContestant)

router.route('/:election_id/contestant/:contestant_id')
    .put(updateContestant)
    .delete(deleteContestant)

    
router.route('/:election_id/student/:student_id/messages')
.post(createMessage)

router.route('/:election_id/student/:student_id/messages/:message_id')
.delete(deleteMessage)
    

module.exports = router