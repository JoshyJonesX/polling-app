const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Department = require('./department')


const studentSchema = new mongoose.Schema({
    matNo: {
        type: String,
        required: true,
        unique: true
    },
    faculty: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
        required: true,
        unique: true
    },
    level: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    profileImageUrl: {
        type: String
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }],
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    }
})

studentSchema.pre('save', async function(next){
    try {
        if(!this.isModified('password')){
            return next()
        }
        let hashedPassword = await bcrypt.hash(this.password, 10)
        this.password = hashedPassword
        return next()
    } catch (err) {
        return next(err)
    }
})

studentSchema.pre('remove', async function(next){
    try {
        let department = await Department.findById(this.department)
        department.students.remove(this.id)
        await department.save()
        return next()
    } catch (err) {
        return next(err)
    }
})

studentSchema.methods.comparePassword = async function(candidatePassword, next){
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch
    } catch (err) {
        return next(err)
    }
}

const Student = mongoose.model('Student', studentSchema)

module.exports = Student