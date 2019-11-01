require('dotenv').config()
const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const db = require("./models")
const errorHandler = require("./handlers/error")
const authRoutes = require('./routes/auth')
const facultiesRoutes = require('./routes/faculties')
const departmentsRoutes = require('./routes/departments')
const electionRoutes = require('./routes/elections')
const studentRoutes = require('./routes/students')
const unRegstudentRoutes = require('./routes/unRegStudents')
const { loginRequired, ensureCorrectStudent } = require('./middleware/auth')

const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes)

app.use('/admin/api/faculty', facultiesRoutes)
app.use('/admin/api/department', departmentsRoutes)
app.use('/admin/api/election', electionRoutes)
app.use('/admin/api/student', studentRoutes)
app.use('/admin/api/UnRegStudent', unRegstudentRoutes)

app.get('/api/election/:election_id/messages/', async function(req, res, next) {
  try {
      let message = await db.Message.find({election: req.params.election_id})
      .sort({createdAt: 'desc'})
      .populate('student', {
        matNo: true,
        username: true,
        profileImageUrl: true,
      })
                              
      return res.status(200).json(message)
  } catch (err) {
      return next(err)
  }
})

app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler)

app.listen(PORT, function() {
  console.log(`Server is starting on port ${PORT}`);
});
