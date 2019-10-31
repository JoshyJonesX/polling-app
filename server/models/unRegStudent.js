const mongoose = require('mongoose')

const unRegStudentSchema = new mongoose.Schema({
    matNo: {
        type: String,
        required: true,
        unique: true
    },
    phoneNo: {
        type: String,
        required: true,
        unique: true
    }
})

const unRegStudent = mongoose.model('unRegStudent', unRegStudentSchema)

module.exports = unRegStudent