const express  = require('express')
const router = express.Router()

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
    

module.exports = router