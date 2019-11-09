const mongoose = require('mongoose')
mongoose.set('debug', true)
mongoose.Promise = Promise
mongoose.connect('mongodb://localhost/polls_v2', {
    keepAlive: true
})

module.exports.Student = require('./student')
module.exports.Message = require('./message')
module.exports.Department = require('./department')
module.exports.Election = require('./election')
module.exports.Faculty = require('./faculty')
module.exports.UnRegStudent = require('./unRegStudent')
module.exports.Contestant = require('./contestant')