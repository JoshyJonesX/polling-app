require('dotenv').load()
const jwt = require('jsonwebtoken')

// add is admin verification

exports.loginRequired = function(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if (decoded) {
                return next()
            } else{
                return next({
                    status: 401,
                    message: 'Please log in first'
                })
            }
        })
    } catch (err) {
        return next({
            status: 401,
            message: 'Please log in first'
        })
    }
}

exports.ensureCorrectStudent = function(req, res, next) {
    
    try {
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if (decoded && decoded.id === req.params.user_id) {
                return next()
            } else{
                return next({
                    status: 401,
                    message: 'Unauthorized'
                })
            }
        })
    } catch (err) {
        return next({
            status: 401,
            message: 'Unauthorized'
        })
    }
}