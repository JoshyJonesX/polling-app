import C from '../constants'

const student = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_STUDENT:
            return {
                ...action.student
            }
        case C.UPDATE_STUDENT:
            return {
                    ...action.student
                }
        default:
            return state
    }
}

export default (state = [], action) => {
    switch (action.type) {
        case C.ADD_STUDENT:
            return [
                ...state,
                student({}, action)
            ]
        case C.GET_STUDENTS:
            return [...action.students]
        case C.UPDATE_STUDENT:
                return [
                    ...state.filter(s => s._id !== action.student._id), student({}, action)
                ]
        case C.REMOVE_STUDENT:
            return state.filter(
                s => s._id !== action.student._id
            )
        default:
            return state
    }
}