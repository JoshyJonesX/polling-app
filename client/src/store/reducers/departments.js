import C from '../constants'

const department = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_DEPARTMENT:
            return {
                ...action.department
            }
        case C.UPDATE_DEPARTMENT:
            return {
                    ...action.department
                }
        default:
            return state
    }
}

export default (state = [], action) => {
    switch (action.type) {
        case C.ADD_DEPARTMENT:
            return [
                ...state,
                department({}, action)
            ]
        case C.GET_DEPARTMENTS:
            return [...action.departments]
        case C.UPDATE_DEPARTMENT:
                return [
                    ...state.filter(d => d._id !== action.department._id), department({}, action)
                ]
        case C.REMOVE_DEPARTMENT:
            return state.filter(
                d => d._id !== action.department._id
            )
        default:
            return state
    }
}