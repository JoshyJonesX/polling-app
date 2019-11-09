const mongoose = require('mongoose')
const Faculty = require('./faculty')
const Department = require('./department')
const Contestant = require('./contestant')

const electionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    contestants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contestant"
    }],
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty"
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }]
})

electionSchema.pre('remove', async function(next){
    try {        
        if (typeof this.faculty == null) {
            let faculty = await Faculty.findById(this.faculty)
            faculty.elections.remove(this.id)
            await faculty.save()
        }
        if (typeof this.department == null) {
            let department = await Department.findById(this.department)
            department.elections.remove(this.id)
            await department.save()
        }
        if (this.contestants.length) {
            let contestant = await Contestant.findById(this.contestant)
            contestant.elections.remove(this.id)
            await contestant.save()
        }
        return next()
    } catch (err) {
        return next(err)
    }
})

const Election = mongoose.model('Election', electionSchema)

module.exports = Election