const mongoose = require('mongoose')
const Student = require('./student')
const Election = require('./election')


const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxLength: 160
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    election: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Election"
    }
},
{
    timestamps: true
})

messageSchema.pre('remove', async function(next){
    try {

        let student = await Student.findById(this.student)
        student.messages.remove(this.id)
        await  student.save()

        let election = await Election.findById(this.election)
        election.messages.remove(this.id)
        await  election.save()
        
        return next()
    } catch (err) {
        return next(err)
    }
})

const Message = mongoose.model("Message", messageSchema)
module.exports = Message