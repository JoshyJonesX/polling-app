const db = require('../models')

exports.createElection = async function(req, res, next) {
    try {        
        if (req.body.category === "department") {
            if (req.params.id) {
                let department = await db.Department.findById(req.params.id) 
                let election = await db.Election.create({
                    name: `${department.abv} ${req.body.name}`,
                    category: req.body.category,
                    active: req.body.active,
                    department: req.params.id
                })
                    department.elections.push(election._id)
                    await department.save()
                return res.status(200).json(election)
            } else {
                let departments = await db.Department.find({})
                departments.map(async ({_id, abv}) => {
                    try {
                        let election = await db.Election.create({
                            name: `${abv} ${req.body.name}`,
                            category: req.body.category,
                            active: req.body.active,
                            department: _id
                        })
                        let department = await db.Department.findById(_id)
                            department.elections.push(election._id)
                            await department.save()
                            let data = await db.Election.findById(election._id)
                                                .populate({path: 'department', select: 'abv _id'})
                                                .populate({path: 'contestants', select: 'fName lName matNo votes student'})
                            return res.status(200).json(data)
                    } catch (err) {
                        if (err.code === 11000) {
                            err.message = 'Election already exist'
                        }
                        return next({
                            status: 400,
                            message: err.message
                        })
                    }
                })
            }
                       
        } else if(req.body.category === "faculty") {
            if (req.params.id) {
                let faculty = await db.Faculty.findById(req.params.id) 
                let election = await db.Election.create({
                    name: `${faculty.abv} ${req.body.name}`,
                    category: req.body.category,
                    active: req.body.active,
                    faculty: req.params.id
                })
                    faculty.elections.push(election._id)
                    await faculty.save()
                return res.status(200).json(election)
            } else {
                let faculties = await db.Faculty.find({})
                faculties.map(async ({_id, abv}) => {
                    try {
                        let election = await db.Election.create({
                            name: `${abv} ${req.body.name}`,
                            category: req.body.category,
                            active: req.body.active,
                            faculty: _id
                        })
                        let faculty = await db.Faculty.findById(_id)
                            faculty.elections.push(election._id)
                            await faculty.save()
                        let data = await db.Election.findById(election._id)
                                            .populate({path: 'faculty', select: 'abv -_id'})
                                            .populate({path: 'contestants', select: 'fName lName matNo votes student'})
                            return res.status(200).json(data)
                    } catch (err) {
                        if (err.code === 11000) {
                            err.message = 'Election already exist'
                        }
                        return next({
                            status: 400,
                            message: err.message
                        })
                    } 
                })
            }   
        } else if(req.body.category === "general") {
            let election = await db.Election.create({
                name: req.body.name,
                category: req.body.category,
                active: req.body.active
            })
            return res.status(200).json(election)
            .populate({path: 'contestants', select: 'fName lName matNo votes student'})
        }
    } catch (err) {
        if (err.code === 11000) {
            err.message = 'Election already exist'
        }
        return next({
            status: 400,
            message: err.message
        })
    }
}

exports.getElections = async function(req, res, next) {
    try {
        let elections = await db.Election.find({})
                            .populate({path: 'faculty', select: 'abv -_id'})
                            .populate({path: 'department', select: 'abv -_id'})
                            .populate({path: 'contestants', select: 'fName lName matNo votes student'})
        return res.status(200).json(elections)
    } catch (err) {
        return next(err)        
    }
}

exports.getElection = async function(req, res, next) {
    try {
        let election = await db.Election.findById(req.params.election_id)
                            .populate({path: 'faculty', select: 'abv -_id'})
                            .populate({path: 'department', select: 'abv -_id'})
                            .populate({path: 'contestants', select: 'fName lName matNo votes student'})
        return res.status(200).json(election)
    } catch (err) {
        return next(err)        
    }
}

exports.updateElection = async function (req, res, next) {
    try {
        let election = await db.Election.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
                            .populate({path: 'faculty', select: 'abv -_id'})
                            .populate({path: 'department', select: 'abv -_id'})
                            .populate({path: 'contestants', select: 'fName lName matNo votes student'})
        res.status(200).json(election)
    } catch (err) {
        return next(err)
    }
}

exports.deleteElection = async function(req, res, next) {
    try {
        let foundElection = await db.Election.findById(req.params.id)
        let { contestants, messages } = foundElection
        if (contestants) {
            contestants.map(async contestant => {
                try {
                    await db.Contestant.findByIdAndRemove(contestant._id)
                } catch (err) {
                    return next(err)
                }
            })
        }
        if (messages) {
            messages.map(async message => {
                try {
                    await db.Message.findByIdAndRemove(message._id)
                } catch (err) {
                    return next(err)
                }
            })
        }
        await foundElection.remove()
        return res.status(200).json(foundElection)
    } catch (err) {
        return next(err)
    }
}