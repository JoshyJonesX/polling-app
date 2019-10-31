const express = require('express')
const router = express.Router()

const { 
    createUnRegStudent,
    getUnRegStudents,
    updateUnRegStudent,
    deleteUnRegStudent
 } = require('../handlers/unRegStudent')

 router.route('/')
    .get(getUnRegStudents)
    .post(createUnRegStudent)

router.route('/:unRegStudent_id')
    .put(updateUnRegStudent)
    .delete(deleteUnRegStudent)

module.exports = router