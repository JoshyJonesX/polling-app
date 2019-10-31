import C from '../constants'

export default (state = {message: null}, action) => {
    switch (action.type) {
        case C.ADD_ERROR:
            return { ...state, message: action.error}    
        case C.REMOVE_ERROR:
            return { ...state, message: null}    
        default:
            return state
    }
}