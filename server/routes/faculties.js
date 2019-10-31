const express  = require('express')
const router = express.Router()

const {
    createFaculty,
    getFaculty,
    getFaculties, 
    updateFaculty,
    deleteFaculty
} = require('../handlers/faculty')

router.route('/')
    .post(createFaculty)
    .get(getFaculties)

router.route('/:faculty_id')
    .get(getFaculty)
    .put(updateFaculty)
    .delete(deleteFaculty)

module.exports = router