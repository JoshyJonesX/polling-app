const mongoose = require('mongoose')
const Faculty = require('./faculty')
const Department = require('./department')

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
        let faculty = await Faculty.findById(this.faculty)
        faculty.elections.remove(this.id)
        await faculty.save()
        let department = await Department.findById(this.department)
        department.elections.remove(this.id)
        await department.save()
        return next()
    } catch (err) {
        return next(err)
    }
})

const Election = mongoose.model('Election', electionSchema)

module.exports = Election