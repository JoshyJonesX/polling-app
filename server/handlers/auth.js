const db = require('../models')
const jwt = require('jsonwebtoken')
const Nexmo = require('nexmo')

const nexmo = new Nexmo({
    apiKey: '193d39e4',
    apiSecret: 'm0dgqHeeTZboTsHE'
  }, {debug: true})

exports.signin = async function (req, res, next) {
    try {
        let student = await db.Student.findOne({
            matNo: req.body.matNo
        })
        let { matNo, username, profileImageUrl } = student
        let isMatch = await student.comparePassword(req.body.password)
        console.log(isMatch)
        if(isMatch){
            let token = jwt.sign({
           matNo,
           username,
           profileImageUrl
       }, process.env.SECRET_KEY
        )
        return res.status(200).json({
            matNo,
            username,
            profileImageUrl,
            token
        })
        }   else {
            return next({
                status: 400,
                message: "Invalid Matric Number/Password"
            })
        }        
    } catch (err) {
        return next({
            status: 400,
            message: "Invalid Matric Number/Password"
        })
    }

}

exports.signup = async function (req, res, next) {
    try {
       let student = await db.Student.create(req.body)

       let foundDepartment = await db.Department.findById(req.params.department_id)
       foundDepartment.students.push(student._id)
       await foundDepartment.save()

       let { matNo, username, profileImageUrl } = student
       let token = jwt.sign({
           matNo,
           username,
           profileImageUrl
       }, process.env.SECRET_KEY
        )
        return res.status(200).json({
            matNo,
            username,
            profileImageUrl,
            token
        })
    } catch (err) {
        if(err.code === 11000){
            err.message = 'Sorry, that username already is taken'
        }
        return next({
            status: 400,
            message: err.message
        })
        
    }
}

exports.preSignup = async function (req, res, next) {
    try {
        // change to two way verification
        let unRegStudent = await db.UnRegStudent.findOne({matNo: req.body.matNo})
        let { phoneNo, matNo} = unRegStudent
        const text = `${matNo} your registration code is: 4190 `
        nexmo.message.sendSms( 'IBB Polls', phoneNo, text, (err, responseData) => {
            if (err) {
               return next(err)
            } else {
                if(responseData.messages[0]['status'] === "0") {
                  return res.status(200).json("Message sent successfully.")
                } else {
                    return next({
                        status: 400,
                        message:`Message failed with error: ${responseData.messages[0]['error-text']}`
                    });
                }
            }
        })
    } catch (err) {
        return next(err)
    }    
}