const db = require('../models')

// create
exports.createDepartment = async function(req, res, next) {
    try {
        let department = await db.Department.create({
            name: req.body.name,
            abv: req.body.abv,
            faculty: req.body.id
        })
        let foundFaculty = await db.Faculty.findById(req.body.id)
        foundFaculty.departments.push(department._id)
        await foundFaculty.save()
        let foundDepartment = await db.Department.findById(department._id).populate({path: 'faculty', select: 'abv -_id'})
        return res.status(200).json(foundDepartment)
    } catch (err) {
        if (err.code === 11000) {
            err.message = 'Department already exist'
        }
        return next({
            status: 400,
            message: err.message
        })
    }
}

exports.getDepartments = async function(req, res, next) {
    try {
        let departments = await db.Department.find({})
                                .populate({path: 'faculty', select: 'abv -_id'})
        return res.status(200).json(departments)
    } catch (err) {
        return next(err)
    }
}

exports.getDepartment = async function(req, res, next) {
    try {
        let department = await db.Department.findById(req.params.department_id)
        return res.status(200).json(department)
    } catch (err) {
        return next(err)
    }
}

exports.updateDepartment = async function (req, res, next) {
    try {
        let updatedDepartment = await db.Department.findByIdAndUpdate({_id: req.params.department_id}, req.body, {new: true})
        return res.status(200).json(updatedDepartment)
    } catch (err) {
        return next(err)
    }
}

exports.deleteDepartment = async function(req, res, next) {
    try {
        let foundDepartment = await db.Department.findById(req.params.department_id)
        let { elections, students } = foundDepartment
        if (elections) {
            elections.map(async election => {
                try {
                    await db.Election.findByIdAndRemove(election)
                } catch (err) {
                    return next(err)
                }
            })
        }
        if (students) {
            students.map(async student => {
                try {
                    await db.Student.findByIdAndRemove(student)
                } catch (err) {
                    return next(err)
                }
            })
        }
        await foundDepartment.remove()
        return res.status(200).json(foundDepartment)
    } catch (err) {
        return next(err)
    }
}