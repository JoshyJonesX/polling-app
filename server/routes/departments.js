const express = require('express')
const router = express.Router()

const {
    createDepartment,
    getDepartment,
    getDepartments,
    updateDepartment,
    deleteDepartment
} = require('../handlers/department')

router.route('/')
    .post(createDepartment)
    .get(getDepartments)

router.route('/:department_id')
    .get(getDepartment)
    .put(updateDepartment)
    .delete(deleteDepartment)

module.exports = router