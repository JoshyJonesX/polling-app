const db = require('../models')

// create
exports.createUnRegStudent = async function (req, res, next) {
    try {
        let unRegStudent = await db.UnRegStudent.create(req.body)
        return res.status(200).json(unRegStudent)
    } catch (err) {
        if (err.code === 11000) {
            err.message = 'Unregisterd User already exist'
        }
        return next({
            status: 400,
            message: err.message
        })
    }
}

// read
exports.getUnRegStudents = async function (req, res, next) {
    try {
        let unRegStudent = await db.UnRegStudent.find()
        return res.status(200).json(unRegStudent)
    } catch (err) {
        return next(err)
    }
}

// update
exports.updateUnRegStudent = async function (req, res, next) {
    try {
        let found = await db.UnRegStudent.findByIdAndUpdate({_id: req.params.unRegStudent_id}, req.body, {new: true})
        return res.status(200).json(found)
    } catch (err) {
        return next(err)
    }
}

// delete
exports.deleteUnRegStudent = async function (req, res, next) {
    try {
        let found = await db.UnRegStudent.findById(req.params.unRegStudent_id)
        await found.remove()
        return res.status(200).json(found)
    } catch (err) {
        return next(err)
    }
}