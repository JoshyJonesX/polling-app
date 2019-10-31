const mongoose = require('mongoose')
const Faculty = require('./faculty')

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    abv: {
        type: String,
        required: true,
        unique: true        
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty"
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    }],
    elections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Election"
    }]
})

departmentSchema.pre('remove', async function(next){
    try {        
        let faculty = await Faculty.findById(this.faculty)
        faculty.departments.remove(this.id)
        await faculty.save()
        return next()
    } catch (err) {
        return next(err)
    }
})

const Department = mongoose.model('Department', departmentSchema)

module.exports = Department