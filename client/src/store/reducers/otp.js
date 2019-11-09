import C from '../constants'

const DEFAULT_STATE = {
    request_id: ''
}

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case C.SET_OTP:
            return {
                request_id: action.otp.request_id
            }
        default:
            return state
    }
}