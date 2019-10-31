const mongoose = require('mongoose')
const Election = require('./election')

const contestantSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    election: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Election"
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        unique: true
    },
    votes: Number
})

contestantSchema.pre('remove', async function(next){
    try {
            let election = await Election.findById(this.election)
            election.contestants.remove(this.id)
            await election.save()
            return next()
    } catch (err) {
        return next(err)
    }
})

const Contestant = mongoose.model("Contestant", contestantSchema)

module.exports = Contestant