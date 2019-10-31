const db = require("../models")

exports.createMessage = async function(req, res, next) {
  try {
    let message = await db.Message.create({
      text: req.body.text,
      student: req.params.student_id,
      election: req.params.election_id
    })

    let foundStudent = await db.Student.findById(req.params.student_id)
    foundStudent.messages.push(message._id)
    await foundStudent.save()

    let foundElection = await db.Election.findById(req.params.election_id)
    foundElection.messages.push(message._id)
    await foundElection.save()

    let foundMessage = await db.Message.findById(message._id).populate("user", {
      matNo: true,
      username: true,
      profileImageUrl: true
    })
    return res.status(200).json(foundMessage)
  } catch (err) {
    return next(err)
  }
}

// GET - @index.js


// DELETE /api/election/:election_id/user/:user_id/messages/:message_id
exports.deleteMessage = async function(req, res, next) {
  try {
    let foundMessage = await db.Message.findById(req.params.message_id)
    await foundMessage.remove()

    return res.status(200).json(foundMessage)
  } catch (err) {
    return next(err)
  }
}
