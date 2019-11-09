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

       let foundDepartment = await db.Department.findById(req.body.department)
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
            err.message = 'Sorry, that username is already taken'
        }
        return next({
            status: 400,
            message: err.message
        })
        
    }
}

exports.register = async function (req, res, next) {
    try {
        console.log(req.body.matNo)
        let unRegStudent = await db.UnRegStudent.findOne({matNo: req.body.matNo})
        let { phoneNo, matNo} = unRegStudent
        nexmo.verify.request({number: phoneNo, brand: 'IBBUL'}, (err, result) => {
            if(err) {
              return next({
                status: 500,
                message: err
            })
            } else {
                if(result && result.status == '0') {
                    console.log(result)
                    res.status(200).json(result)
                } else {
                    return next({
                        status: 400,
                        message: result.error_text
                    })
                }
            }
          })
    } catch (err) {
        return next(err)
    }    
}

exports.check = async function (req, res, next) {
    try {
        let pin = req.body.pin;
        let requestId = req.body.request_id
        
        nexmo.verify.check({request_id: requestId, code: pin}, (err, result) => {
            if(err) {
                throw err
            } else {        
                if(result && result.status == '0') {
                    console.log(result)
                    //A status of 0 means success! Respond with 200: OK
                    res.status(200).send(result)
                    console.log('Account verified!')
                } else {
                    return next({
                        status: 400,
                        message: result.error_text
                    })
                }
            }
        })
    } catch (err) {
        return next(err)
    }    
}

exports.cancel = async function (req, res, next) {
    try {
        let requestId = req.body.request_id
 
        nexmo.verify.control({request_id: requestId, cmd:'cancel'}, (err, result) => {
            if(err) {
                throw err
            } else {
                if(result && result.status == '0') {
                    //A status of 0 means success! Respond with 200: OK
                    res.status(200).send(result)
                    console.log('Account verified!')
                } else {
                    return next({
                        status: 400,
                        message: result.error_text
                    })
                }
            }
        })
    } catch (err) {
        return next(err)
    }    
}