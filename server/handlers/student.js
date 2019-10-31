const db = require('../models')

// create auth.signup

// read
exports.getStudents = async function (req, res, next) {
    try {
        let students = await db.Students.find({})
                                .populate('department', {
                                    abv: true,                                    
                                })
        return res.status(200).json(students)
    } catch (err) {
        return next(err)
    }
}

//update no update route student data shouldn't be updated by admin

// delete
exports.deleteStudent = async function(req, res, next) {
    try {
        let foundStudent = await db.Student.findById(req.params.student_id)
        let { messages } = foundStudent
        if (messages) {
            messages.map(async message => {
                try {
                    await db.Message.findByIdAndRemove(message)
                } catch (err) {
                    return next(err)
                }
            })
        }
        await foundStudent.remove()
        return res.status(200).json(foundStudent)
    } catch (err) {
        return next(err)
    }
}