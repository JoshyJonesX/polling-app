import { apiCall, setTokenHeader  } from "../../services/api"
import C from "../constants"
import { addError, removeError } from "./errors"

const setCurrentUser = user => ({
        type: C.SET_CURRENT_USER,
        user
    })

    const setOTP = otp => ({
        type: C.SET_OTP,
        otp
    })

export const setAuthorizationToken = token => {
    setTokenHeader(token)
}

export const logout = () => (
    dispatch => {
      localStorage.clear()
      setAuthorizationToken(false)
        dispatch(setCurrentUser({}))
    })

export const authUser = (type, userData) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall("post", `/api/auth/${type}`, userData).then(({token, ...user}) => {
                localStorage.setItem("jwtToken", token)
                dispatch(setCurrentUser(user))
                dispatch(removeError())
                resolve()
            })
            .catch(err => {
                dispatch(addError(err.message))
                reject()
            })
        })
    }
}

export const otpAuth = (type, otpData) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall("post", `/api/auth/${type}`, otpData).then( otp => {
                dispatch(setOTP(otp))
                dispatch(removeError())
                resolve()
            })
            .catch(err => {
                dispatch(addError(err.message))
                reject()
            })
        })
    }
}