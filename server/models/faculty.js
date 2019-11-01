const mongoose = require('mongoose')
const Election = require('./election')
const Department = require('./department')

const facultySchema = new mongoose.Schema({
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
    departments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    }],
    elections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Election"
    }]
})

facultySchema.pre('remove', async function(next){
    try {
            if (this.departments.length) {
                await this.departments.map(async (department) => {
                    let found = Department.findById(department)
                    await found.remove()
                })
            }
            if (this.elections.length) {
                await this.elections.map(async (election) => {
                    let found = Election.findById(election)
                    await found.remove()
                })
            }
            return next()
    } catch (err) {
        return next(err)
    }
})

const Faculty = mongoose.model('Faculty', facultySchema)

module.exports = Faculty