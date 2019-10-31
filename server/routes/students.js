const express  = require('express')
const router = express.Router()

const {
    getStudents,
    deleteStudent
} = require('../handlers/student')

router.route('/')
    .get(getStudents)

    router.route('/:student_id')
        .delete(deleteStudent)

module.exports = router