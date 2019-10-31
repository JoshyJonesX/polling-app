import C from '../constants'

const faculty = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_FACULTY:
            return {
                ...action.faculty
            }
        case C.UPDATE_FACULTY:
            return {
                    ...action.faculty
                }
        default:
            return state
    }
}

export default (state = [], action) => {
    switch (action.type) {
        case C.ADD_FACULTY:
            return [
                ...state,
                faculty({}, action)
            ]
        case C.GET_FACULTIES:
            return [...action.faculties]
        case C.UPDATE_FACULTY:
                return [
                    ...state.filter(f => f._id !== action.faculty._id), faculty({}, action)
                ]
        case C.REMOVE_FACULTY:
            return state.filter(
                f => f._id !== action.faculty._id
            )
        default:
            return state
    }
}