const mongoose = require('mongoose')

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
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }]
})

const Election = mongoose.model('Election', electionSchema)

module.exports = Election