const db = require('../models')

// create
exports.createContestant = async function (req, res, next) {
    try {
        let student = await db.Student.findOne({matNo: req.body.matNo})
        let contestant = await db.Contestant.create({
            fName: req.body.fName,
            lName: req.body.lName,
            matNo: student.matNo,
            election: req.params.election_id,
            student: student._id,
            vote: 0
        })
        let election = await db.Election.findById(req.params.election_id)
        election.contestants.push(contestant._id)
        election.save()
        return res.status(200).json(contestant)
    } catch (err) {
        if (err.code === 11000) {
            err.message = 'Contestant already participating in this/an election'
        }
        return next({
            status: 400,
            message: err.message
        })
    }
}

// read
exports.getContestants = async function (req, res, next) {
    try {
        let contestants = await db.Contestant.find({})
                                .populate('student', {
                                    matNo: true,
                                    level: true
                                })
                                .populate('election', {
                                    name: true,
                                    category: true
                                })
        return res.status(200).json(contestants)
    } catch (err) {
        return next(err)
    }
}

// update
exports.updateContestant = async function (req, res, next) {
    try {
        let foundContestant = await db.Contestant.findByIdAndUpdate({_id: req.params.contestant_id}, req.body, {new: true})
        return res.status(200).json(foundContestant)
    } catch (err) {
        return next(err)
    }
}

// delete
exports.deleteContestant = async function(req, res, next) {
    try {
        let foundContestant = await db.Contestant.findById(req.params.contestant_id)
        await foundContestant.remove()
        return res.status(200).json(foundContestant)
    } catch (err) {
        return next(err)
    }
}