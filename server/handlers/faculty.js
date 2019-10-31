const db = require('../models')

// create
exports.createFaculty = async function (req, res, next) {
    try {
        let faculty = await db.Faculty.create(req.body)
        return res.status(200).json(faculty)
    } catch (err) {
        if (err.code === 11000){
            err.message = 'Faculty already exists'
        }
        return next({
            status: 400,
            message: err.message
        })
    }
}

// read
exports.getFaculties = async function (req, res, next) {
    try {
        const faculties = await db.Faculty.find({})
            .populate('departments', {
                name: true,
                abv: true
            })
            .populate('elections', {
                name: true,
                active: true
            })
        return res.status(200).json(faculties)
    } catch (err) {
        return next(err)
    }
}

// read
exports.getFaculty = async function(req, res, next) {
    try {
        let faculty = await db.Faculty.findById({_id: req.params.faculty_id}).populate('departments', {
            name: true,
            abv: true
        })
        .populate('elections', {
            name: true,
            active: true
        })
        return res.status(200).json(faculty)
    } catch (err) {
        return next(err)
    }
}

// update
exports.updateFaculty = async function (req, res, next) {
    try {
        const updatedfaculty = await db.Faculty.findOneAndUpdate({_id: req.params.faculty_id}, req.body, {new: true})
        return res.status(200).json(updatedfaculty)
    } catch (err) {
        return next(err)
    }
}

// delete
exports.deleteFaculty = async function (req, res, next) {
    try {
        const foundFaculty = await db.Faculty.findById({_id: req.params.faculty_id})
        let { departments, elections  } = foundFaculty
        departments.map(async department => {
            try {
                await db.Department.findByIdAndRemove(department)
            } catch (err) {
                next(err)
            }
        })
        elections.map(async election => {
            try {
                await db.Election.findByIdAndRemove(election)
            } catch (err) {
                next(err)
            }
        })
        await foundFaculty.remove()
        return res.status(200).json(foundFaculty)
    } catch (err) {
        return next(err)
    }
}